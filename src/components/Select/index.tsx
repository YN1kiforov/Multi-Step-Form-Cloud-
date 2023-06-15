import React, { useEffect, useRef, useState } from 'react';
import { useField } from 'formik';

import s from './style.module.scss'

interface OptionProps {
  value: string;
  label: string;
  children: React.ReactNode;
}

interface SelectFieldProps {
  name: string;
  children: React.ReactElement<OptionProps>[];
}

interface Option {
  value: string;
  label: React.ReactNode;
}

export const SelectField: React.FC<SelectFieldProps> = ({ name, children }) => {
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

  const options: Option[] = children.map(child => ({
    value: child.props.value,
    label: child.props.children,
  }));

  return (
    <div className={s.container} ref={selectRef}>
      <div className={`${s.select} ${isOpen ? s.open : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {field.value ? (
          options.find(option => option.value === field.value)?.label
        ) : (
          <span className={s.placeholder}>Выберите вариант</span>
        )}
        <span className={s.arrow}>&#9662;</span>
      </div>
      {isOpen && (
        <ul className={s.list}>
          {options.map(option => (
            <li key={option.value} onClick={() => handleOptionClick(option.value)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
      {meta.touched && meta.error ? <div className={s.tip}>{meta.error}</div> : null}
    </div>
  );
};
