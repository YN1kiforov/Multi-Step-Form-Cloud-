import { useField, FieldAttributes } from 'formik';
import { TextField } from '../Textfield';
import s from './style.module.scss'

export const FormikTextField = ({ label, ...props }: FieldAttributes<any>) => {
  const [field, meta] = useField(props.name);
  return (
    <>
      <TextField label={label} {...field} {...props}></TextField>
      {meta.touched && meta.error ? (
        <div className={s.tip}>{meta.error}</div>
      ) : null}
    </>

  );
};