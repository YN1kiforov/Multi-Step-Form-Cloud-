import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';

import { TextField } from '../../components/Textfield';
import { SelectField } from '../../components/Select/index';
import { Button } from '../../components/Button';
import { RootState } from '../../redux/store'

import s from './style.module.scss'
import { Step } from '../../commonTypes';


const Schema = Yup.object().shape({
  nickname: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, 'Можно использовать только буквы и цифры')
    .max(30, 'Максимальная длина 30 символов')
    .required('Обязательное поле'),
  name: Yup.string()
    .matches(/^[a-zA-Zа-яА-Я]+$/, 'Можно использовать только буквы')
    .max(30, 'Максимальная длина 30 символов')
    .required('Обязательное поле'),
  sername: Yup.string()
    .matches(/^[a-zA-Zа-яА-Я]+$/, 'Можно использовать только буквы')
    .max(30, 'Максимальная длина 30 символов')
    .required('Обязательное поле'),
  sex: Yup.string()
    .required('Обязательное поле'),
});


export const Step1 = ({ onNext, onPrev }: Step) => {
  const initialValues = useSelector((state: RootState) => ({
    nickname: state.user.nickname,
    name: state.user.name,
    sername: state.user.sername,
    sex: state.user.sex,
  }))

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Schema}
      onSubmit={(values, actions) => {
        onNext(values)
      }}
    >
      {props => (
        <Form className={s.form} onSubmit={props.handleSubmit}>
          <TextField placeholder="nickname" name="nickname" type="text" label="Nickname" />
          <TextField placeholder="Иван" name="name" type="text" label="Имя" />
          <TextField placeholder="Иванов" name="sername" type="text" label="Фамилия" />
          <label className={s.label}>пол</label>
          <SelectField name="sex">
            <option value="red">мужской</option>
            <option value="green">женский</option>
          </SelectField>
          <div className={s.buttons}>
            <Button onClick={() => onPrev(props.values)} variant="outlined">Назад</Button>
            <Button type="submit" variant="filled">Вперед</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
