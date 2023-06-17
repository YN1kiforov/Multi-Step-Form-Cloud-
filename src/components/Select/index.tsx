import React, { useEffect, useRef, useState } from 'react';
import { useField } from 'formik';

import s from './style.module.scss'
interface SelectFieldProps {
  name: string;
  children: React.ReactElement[];
}

export const SelectField = ({ name, children }: SelectFieldProps) => {
  const [field, meta, helpers] = useField(name);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  const handleOptionClick = (selectedValue: string) => {
    helpers.setValue(selectedValue);
    setIsOpen(false);
  };

  return (
    <div className={s.container} ref={selectRef}>
      <div className={`${s.select} ${isOpen ? s.open : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {field.value ? (
          children.find(option => option.props.value === field.value)?.props.children
        ) : (
          <span className={s.placeholder}>Выберите вариант</span>
        )}
        <span className={s.arrow}>&#9662;</span>
      </div>
      {isOpen && (
        <ul className={s.list}>
          {children.map((child) => (
            <Option
              key={child.props.value}
              onClick={() => handleOptionClick(child.props.value)}
              {...child.props}
            >
              {child.props.children}
            </Option>
          ))}
        </ul>
      )}
      {meta.touched && meta.error ? <div className={s.tip}>{meta.error}</div> : null}
    </div>
  );
};

interface Option {
  value: string;
  children: React.ReactNode;
}

export const Option = ({ value, children, ...props }: Option) => {

  return (
    <li {...props}>
      {children}
    </li>
  );
};
