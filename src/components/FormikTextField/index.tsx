import { useField, FieldAttributes } from 'formik';
import { TextField } from '../Textfield';
import { ErrorMessage } from '../ErrorMessage';

export const FormikTextField = ({ label, ...props }: FieldAttributes<any>) => {
  const [field, meta] = useField(props.name);
  return (
    <>
      <TextField label={label} {...field} {...props}></TextField>
      <ErrorMessage show={!!meta.touched && !!meta.error}>{meta.error}</ErrorMessage>
    </>

  );
};