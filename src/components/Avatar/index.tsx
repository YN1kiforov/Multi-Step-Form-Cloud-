import React from 'react';

import s from './style.module.scss'

interface IAvatar {
  imgSrc?: string,
  children?: React.ReactNode
}

export const Avatar: React.FC<IAvatar> = ({ imgSrc, children }) => {


  return (
    imgSrc ? <img className={s.avatar} src={imgSrc} alt="Аватар пользователя" /> : <div className={s.avatar}>{children}</div>
  );
}
