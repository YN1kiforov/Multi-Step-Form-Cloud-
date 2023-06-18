import React from 'react';

import s from './style.module.scss'

interface IAvatar {
  imgSrc?: string,
  children?: React.ReactNode
}

export const Avatar = ({ imgSrc, children }: IAvatar) => {
  return (
    imgSrc ? <img className={s.avatar} src={imgSrc} alt="Аватар пользователя" /> : <div className={s.avatar}>{children}</div>
  );
}
