import React, { useEffect, useRef } from "react";

import { Button } from '../../components/Button';
import SuccessIcon from "../../assets/SuccessIcon.svg"
import ErrorIcon from "../../assets/ErrorIcon.svg"

import s from './style.module.scss'

interface ModalProps {
  title: string;
  isSuccess: boolean;
  onClose: () => void;
  open: boolean;

}
interface IModal {
  title: string;
  onClose: () => void;

}
export const Modal: React.FC<ModalProps> = ({ isSuccess, open, onClose, title }) => {
  if (!open) {
    return null;
  }

  return (
    isSuccess ? <SuccessModal onClose={onClose} title={title} /> : <FailedModal onClose={onClose} title='das' />
  );
};
const SuccessModal: React.FC<IModal> = ({ onClose, title }) => {

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
const FailedModal: React.FC<IModal> = ({ onClose, title }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [onClose]);
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
