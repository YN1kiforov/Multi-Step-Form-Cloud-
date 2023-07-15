import { useField, FieldAttributes } from 'formik';

import s from './style.module.scss'

export const TextField = ({ label, ...props }: FieldAttributes<any>) => {
  const [field, ] = useField(props.name);
  return (
    <>
      <label className={s.label}>
        {label}
        <input className={s.input} {...field} {...props} />
      </label>
    </>
  );
};