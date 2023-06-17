import React, { ReactNode } from 'react';
import { useField } from 'formik';

import s from './style.module.scss'

interface CheckboxGroupProps {
  name: string;
  children: React.ReactElement[];
  label: string;
}

export const CheckboxGroup = ({ name, children, label }: CheckboxGroupProps) => {
  const [field, meta, helpers] = useField(name);
  const handleChange = (value: number) => {
    const currentValue = meta.value;
    if (currentValue.includes(value)) {
      helpers.setValue(currentValue.filter((val: number) => val !== value));
    } else {
      helpers.setValue([...currentValue, value]);
    }
  };

  return (
    <>
      <label className={s.label}>{label}</label>
      {children.map((child) => (
        <Checkbox
          key={child.props.value}
          name={name}
          checked={field.value.includes(child.props.value)}
          onChange={() => handleChange(child.props.value)}
          {...child.props}
        >
          {child.props.children}
        </Checkbox>
      ))}
    </>
  );
};

interface CheckboxProps {
  value: number;
  children: ReactNode;
}

export const Checkbox = ({ children, ...props }: CheckboxProps) => {
  return <label>
    <input type="checkbox" {...props} />
    {children}
  </label>
};