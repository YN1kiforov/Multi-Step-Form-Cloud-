import React from 'react';
import { useField, FieldAttributes } from 'formik';

import s from './style.module.scss'

interface TextAreaProps extends FieldAttributes<any> {
  maxLength: number;
}

export const TextArea: React.FC<TextAreaProps> = ({ name, maxLength, ...props }) => {
  const [field] = useField(name);

  const getCharacterCount = (value: string) => {
    const trimmedText = value.toString().replace(/\s/g, ''); 
    return trimmedText.length;
  };

  return (
    <div>
      <textarea className={s.textarea}
        {...field}
        {...props}
        maxLength={maxLength}
      />
      <div className={s.counter}>{getCharacterCount(field.value)}</div>
    </div>
  );
};
