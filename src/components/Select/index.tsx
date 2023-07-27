import React, { useEffect, useRef, useState } from 'react';
import { useField } from 'formik';
import { ErrorMessage } from '../ErrorMessage';

import s from './style.module.scss'
interface SelectFieldProps {
  id?: string,
  name: string;
  children: React.ReactElement[];
}

export const SelectField = ({ id, name, children }: SelectFieldProps) => {
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
    <>
      <div className={s.container} ref={selectRef}>
        <div id={id} className={`${s.select} ${isOpen ? s.open : ''}`} onClick={() => setIsOpen(!isOpen)}>
          {field.value ? (
            children.find(option => option.props.value === field.value)?.props.children
          ) : (
            <span className={s.placeholder}>Выберите вариант</span>
          )}
          <span className={s.arrow} />
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

      </div>
      <ErrorMessage show={!!meta.touched && !!meta.error}>{meta.error}</ErrorMessage>

    </>
  );
};

interface OptionProps {
  id?: string,
  value: string;
  children: React.ReactNode;
}

export const Option = ({ value, children, ...props }: OptionProps) => {

  return (
    <li {...props}>
      {children}
    </li>
  );
};
