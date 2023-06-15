import React, { ReactNode } from 'react';

import s from './style.module.scss'

interface IButton {
  children: ReactNode;
  variant: 'filled' | 'outlined';

  [key: string]: any;
}

export const Button: React.FC<IButton> = ({ children, variant, ...props }) => {
  return (
    <button {...props} className={`${s.button} ${s[variant]}`}>
      {children}
    </button>
  );
};

