import React, { ReactNode } from 'react';
import { useField } from 'formik';

import s from './style.module.scss'

interface CheckboxGroupProps {
  name: string;
  children: React.ReactElement[];
  label: string;
}


export const RadioGroup = ({ name, children, label }: CheckboxGroupProps) => {
  const [field, meta, helpers] = useField(name);
  const handleChange = (value: number) => {

    helpers.setValue(value)
  };

  return (
    <>
      <label className={s.label}>{label}</label>

      {children.map((child) => (

        <Radio
          key={child.props.value}
          name={name}
          checked={field.value === child.props.value}
          onChange={() => handleChange(child.props.value)}
          {...child.props}
        >
          {child.props.children}
        </Radio>
      ))}
      {meta.touched && meta.error ? (
        <div className={s.tip}>{meta.error}</div>
      ) : null}
    </>
  );
};

interface CheckboxProps {
  id?: string,
  value: number;
  children: ReactNode;
}
export const Radio = ({ value, children, ...props }: CheckboxProps) => {

  return <label className={s.radio}>
    <input type="radio" value={value} {...props} />
    {children}
  </label>
};