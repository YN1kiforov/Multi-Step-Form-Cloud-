import React, { useEffect, useRef } from "react";

import { Button } from '../../components/Button';
import SuccessIcon from "../../assets/SuccessIcon.svg"
import ErrorIcon from "../../assets/ErrorIcon.svg"

import s from './style.module.scss'

interface ModalProps {
  title: string;
  onClose: () => void;
  open: boolean;
}

export const SuccessModal: React.FC<ModalProps> = ({ open, onClose, title }) => {
  if (!open) {
    return null;
  }
  return (
    <div className={s.modal}>
      <div className={s.content}>
        <h2>{title}</h2>
        <img className={s.icon} src={SuccessIcon} alt="Icon" />
        <Button variant='filled' onClick={onClose}>Закрыть</Button>
      </div>
    </div>
  );
};
export const FailedModal: React.FC<ModalProps> = ({ open, onClose, title }) => {


  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }

    };
    if (open) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [onClose, open]);
  if (!open) {
    return null;
  }
  return (
    <div className={s.modal} >
      <div className={s.content} ref={modalRef}>
        <div className={s.top}>
          <h2>{title}</h2>
          <span onClick={onClose} className={s.close} />
        </div>
        <img className={s.icon} src={ErrorIcon} alt="Icon" />
        <Button variant='filled' onClick={onClose}>Закрыть</Button>

      </div>

    </div>
  );
};
