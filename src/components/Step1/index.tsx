import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';

import { TextField } from '../../components/Textfield';
import { SelectField, Option } from '../../components/Select/index';
import { Button } from '../../components/Button';
import { RootState } from '../../redux/store'

import s from './style.module.scss'
import { Step } from '../../commonTypes';


const Schema = Yup.object().shape({
  nickname: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, 'Можно использовать только латинские буквы и цифры')
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
      onSubmit={values => {
        onNext(values)
      }}
    >
      {props => (
        <Form className={s.form} onSubmit={props.handleSubmit}>
          <TextField id="field-nickname" placeholder="nickname" name="nickname" type="text" label="Nickname" />
          <TextField id="field-name" placeholder="Иван" name="name" type="text" label="Имя" />
          <TextField id="field-sername" placeholder="Иванов" name="sername" type="text" label="Фамилия" />
          <label className={s.label}>пол</label>
          <SelectField id="field-sex" name="sex">
            <Option id="field-sex-option-man" value="man">мужской</Option>
            <Option id="field-sex-option-woman" value="woman">женский</Option>
          </SelectField>
          <div className={s.buttons}>
            <Button id="button-back" onClick={() => onPrev(props.values)} variant="outlined">Назад</Button>
            <Button id="button-next" type="submit" variant="filled">Вперед</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
