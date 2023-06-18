import { useEffect, useRef } from "react";

import { Button } from '../../components/Button';
import SuccessIcon from "../../assets/SuccessIcon.svg"
import ErrorIcon from "../../assets/ErrorIcon.svg"

import s from './style.module.scss'
import { useNavigate } from "react-router-dom";

interface ModalProps {
  title: string;
  onClose: () => void;
  open: boolean;
}
const setBodyOverflow = (open: boolean) => {
  document.body.style.overflow = open ? 'hidden' : 'unset';
};
export const SuccessModal = ({ open, title }: ModalProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    setBodyOverflow(open);
    return () => {
      setBodyOverflow(false);
    };
  }, [open]);
  if (!open) {
    return null;
  }
  const handleClick = () => navigate("/");

  return (
    <div className={s.modal} >
      <div className={`${s.content} ${s.success}`}>
        <h2 className={s.title}>{title}</h2>
        <img className={s.icon} src={SuccessIcon} alt="Icon" />
        <div className={s.button}>
          <Button id="button-to-main" variant='filled' onClick={handleClick}>На главную</Button>
        </div>
      </div>
    </div>
  );
};
export const FailedModal = ({ open, onClose, title }: ModalProps) => {


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

  useEffect(() => {
    setBodyOverflow(open);
    return () => {
      setBodyOverflow(false);
    };
  }, [open]);
  if (!open) {
    return null;
  }
  return (
    <div className={s.modal} >
      <div className={`${s.content} ${s.failed}`} ref={modalRef}>
        <div className={s.top}>
          <h2 className={s.title}>{title}</h2>
          <span onClick={onClose} className={s.close} />
        </div>
        <img className={s.icon} src={ErrorIcon} alt="Icon" />
        <div className={s.button}>
          <Button id="button-close" variant='filled' onClick={onClose}>Закрыть</Button>
        </div>
      </div>

    </div>
  );
};
