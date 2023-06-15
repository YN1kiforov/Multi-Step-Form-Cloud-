import React, { ReactNode } from 'react';
import { useField } from 'formik';

import s from './style.module.scss'

interface CheckboxGroupProps {
  name: string;
  children: React.ReactElement[];
  label: string;
}

export const RadioGroup: React.FC<CheckboxGroupProps> = ({ name, children, label }) => {
  const [field, , helpers] = useField(name);
  const handleChange = (value: number) => {
    helpers.setValue(value)
  };

  return (
    <>
      <label className={s.label}>{label}</label>

      {children.map((child) => (
        React.cloneElement(child, {
          name,
          checked: field.value === child.props.value,
          onChange: (value: number) => handleChange(value),
        })
      ))}
    </>
  );
};

interface CheckboxProps {
  name?: string;
  value: number;
  label?: string;
  onChange?: (value: number) => void
  checked?: boolean;
  children: ReactNode;
}

export const Radio = ({ value, name, children, onChange, checked }: CheckboxProps) => {

  return <label className={s.radio}>
    <input checked={checked} onChange={() => onChange && onChange(value)} type="radio" name={name} value={value} />
    {children}
    <div className={s.check}></div>
  </label>
};