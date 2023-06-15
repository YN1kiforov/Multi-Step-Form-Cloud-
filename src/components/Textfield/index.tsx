import { useField, FieldAttributes } from 'formik';

import s from './style.module.scss'

export const TextField = ({ label, ...props }: { label: string } & FieldAttributes<any>) => {
  const [field, meta] = useField(props.name);
  return (
    <>
      <label className={s.label}>
        {label}
        <input className={s.input} {...field} {...props} />
      </label>
      {meta.touched && meta.error ? (
        <div className={s.tip}>{meta.error}</div>
      ) : null}
    </>
  
  ); 
};