import s from './style.module.scss'
interface ErrorMessageProps {
  children: React.ReactNode,
  show: boolean
}
export const ErrorMessage = ({ children, show }: ErrorMessageProps) => {
  if (!show) return null
  return (
    <div className={s.tip}>{children}</div>
  );
};