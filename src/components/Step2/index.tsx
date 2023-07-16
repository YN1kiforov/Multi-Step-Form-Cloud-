import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';

import { AdvantagesForm } from '../../components/Advantages';
import { RadioGroup, Radio } from '../../components/Radio';
import { CheckboxGroup, Checkbox } from '../../components/Checkbox';
import { Button } from '../../components/Button';
import { RootState } from '../../redux/store'
import s from './style.module.scss'
import { Step } from '../../commonTypes';

const Schema = Yup.object().shape({

  radio: Yup.string()
    .required('Обязательное поле'),
  advantages: Yup.array().of(
    Yup.string().required('Заполните все поля')
  ),
  checkbox: Yup.array()
    .test('is-non-empty', 'Обязательное поле', (value) => value && !!value.length),
});


export const Step2 = ({ onNext, onPrev }: Step) => {

  const initialValues = useSelector((state: RootState) => ({
    advantages: state.user.advantages,
    checkbox: state.user.checkbox,
    radio: state.user.radio,
  }))
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Schema}
      onSubmit={(values) => {
        onNext(values)
      }}
    >
      {props => (
        <Form className={s.form} onSubmit={props.handleSubmit}>
          <label className={s.label}>Преимущества</label>
          <AdvantagesForm />

          <CheckboxGroup label="Checkbox group" name="checkbox" >
            <Checkbox id="field-checkbox-group-option-1" value={1}>1</Checkbox>
            <Checkbox id="field-checkbox-group-option-2" value={2}>2</Checkbox>
            <Checkbox id="field-checkbox-group-option-3" value={3}>3</Checkbox>
          </CheckboxGroup>
          <RadioGroup label="Radio group" name="radio">
            <Radio id="field-radio-group-option-1" value={1}>1</Radio>
            <Radio id="field-radio-group-option-2" value={2}>2</Radio>
            <Radio id="field-radio-group-option-3" value={3}>3</Radio>
          </RadioGroup>
          <div className={s.buttons}>
            <Button id="button-back" onClick={() => onPrev(props.values)} variant="outlined">Назад</Button>
            <Button id="button-next" type="submit" variant="filled">Вперед</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
