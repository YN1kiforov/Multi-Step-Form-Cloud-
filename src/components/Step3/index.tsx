import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { TextArea } from '../../components/Textarea/index';
import { Button } from '../../components/Button';
import { SuccessModal, FailedModal } from '../../components/Modal';
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
        onSubmit={async(values) => {
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
            <label>О себе</label>
            <TextArea id="field-about" maxLength={200} placeholder="О себе" name="about" type="text"/>
            <div className={s.buttons}>
              <Button id="button-back" onClick={() => onPrev(props.values)} variant="outlined">Назад</Button>
              <Button id="button-send" disabled={isLoading} type="submit" variant="filled">Отправить</Button>
            </div>
          </Form>
        )}
      </Formik>
      {isLoading && <Loader />}
      {isSuccess
        ? <SuccessModal title={modalTitle} onClose={handleClose} open={showModal} />
        : <FailedModal title={modalTitle} onClose={handleClose} open={showModal} />
      }
    </>
  );
}
