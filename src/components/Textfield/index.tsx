import { useField, FieldAttributes } from 'formik';

import s from './style.module.scss'
import { useId } from 'react';

export const TextField = ({ label, ...props }: FieldAttributes<any>) => {
  const [field] = useField(props.name);
  const id = useId()
  return (
    <>
      <label className={s.label}>
        {label}
        <input className={s.input} {...field} {...props} id={id} />
      </label>
    </>
  );
};