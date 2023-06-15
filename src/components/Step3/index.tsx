import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { TextArea } from '../../components/Textarea/index';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { Loader } from '../../components/Loader';

import s from './style.module.scss'
import { AppDispatch, fetchData } from '../../redux/slices/userSlice';
import { Step } from '../../commonTypes';
import { RootState } from 'redux/store';

export const Step3 = ({ onNext, onPrev }: Step) => {
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [modalTitle, setModalTitle] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const initialValues = useSelector((state: RootState) => ({
    about: state.user.about,
  }))
  const handleClose = () => setShowModal(false);
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          onNext(values)
          try {
            setIsLoading(true)
            const { payload } = await dispatch(fetchData());
            setIsSuccess(payload.status === "success")
            setModalTitle(payload.message)
          } catch (error) {
            console.error(error);
            setIsSuccess(false)
            setModalTitle("Ошибка")
          } finally {
            setIsLoading(false)
            setShowModal(true)
          }
        }}
      >
        {props => (
          <Form className={s.form} onSubmit={props.handleSubmit}>
            <label htmlFor="email">About</label>
            <TextArea maxLength={200} placeholder="about" name="about" type="text" label="Nickname"></TextArea>
            <div className={s.buttons}>
              <Button onClick={() => onPrev(props.values)} variant="outlined">Назад</Button>
              <Button disabled={isLoading} type="submit" variant="filled">Отправить</Button>
            </div>
          </Form>
        )}
      </Formik>
      {isLoading && <Loader />}
      {showModal && <Modal open={showModal} onClose={handleClose} title={modalTitle} isSuccess={isSuccess} />}
    </>
  );
}
