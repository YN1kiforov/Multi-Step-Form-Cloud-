import { FieldArray, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';

import { AdvantagesForm } from '../../components/Advantages/index';
import { RadioGroup, Radio } from '../../components/Radio/index';
import { CheckboxGroup, Checkbox } from '../../components/Checkbox/index';
import { Button } from '../../components/Button';
import { RootState } from '../../redux/store'
import s from './style.module.scss'
import { Step } from '../../commonTypes';

const Schema = Yup.object().shape({});

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
          <label className={s.label}>Advantages</label>
          <FieldArray name="advantages">
            {() => <AdvantagesForm />}
          </FieldArray>

          <CheckboxGroup label="Checkbox group" name="checkbox" >
            <Checkbox value={1}>1</Checkbox>
            <Checkbox value={2}>2</Checkbox>
            <Checkbox value={3}>3</Checkbox>
          </CheckboxGroup>
          <RadioGroup label="Radio group" name="radio">
            <Radio value={1}>1</Radio>
            <Radio value={2}>2</Radio>
            <Radio value={3}>3</Radio>
          </RadioGroup>
          <div className={s.buttons}>
            <Button onClick={() => onPrev(props.values)} variant="outlined">Назад</Button>
            <Button type="submit" variant="filled">Вперед</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
