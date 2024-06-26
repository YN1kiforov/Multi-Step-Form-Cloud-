import { TextField } from '../Textfield';
import { Button } from '../../components/Button';
import { useField } from 'formik';

import s from './style.module.scss'
import { ErrorMessage } from '../../components/ErrorMessage';


export const AdvantagesForm = () => {
  const [field, meta, helpers] = useField('advantages');
  const addAdvantage = () => {
    helpers.setValue([...field.value, ''])
  };

  const deleteAdvantage = (index: number) => {
    const newAdvantages = [...field.value];
    newAdvantages.splice(index, 1);
    helpers.setValue(newAdvantages)

  };

  return (
    <div className={s.advantage}>
      {field.value.map((_: string, index: number) => (
        <div className={s.item} key={index}>
          <TextField type="text"
            name={`advantages[${index}]`} placeholder="Преимущества" />
          {field.value.length > 1 &&
            <svg onClick={() => deleteAdvantage(index)} className={s.icon} width="16" height="17" viewBox="0 0 16 17" fill="#CCC" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.453 15.6522L2.55826 7.15225C2.52719 6.85703 2.75867 6.5999 3.05552 6.5999H12.9447C13.2416 6.5999 13.4731 6.85703 13.442 7.15225L12.5472 15.6522C12.5205 15.9067 12.3059 16.0999 12.05 16.0999H3.95025C3.69437 16.0999 3.47979 15.9067 3.453 15.6522Z" />
              <path d="M15.0001 4.6999H1.00012C0.72398 4.6999 0.500122 4.47605 0.500122 4.1999V3.2999C0.500122 3.02376 0.72398 2.7999 1.00012 2.7999H3.35511C3.44983 2.7999 3.54261 2.77299 3.62263 2.72231L6.37761 0.977493C6.45764 0.92681 6.55041 0.899902 6.64514 0.899902H9.35511C9.44983 0.899902 9.54261 0.92681 9.62263 0.977493L12.3776 2.72231C12.4576 2.77299 12.5504 2.7999 12.6451 2.7999H15.0001C15.2763 2.7999 15.5001 3.02376 15.5001 3.2999V4.1999C15.5001 4.47604 15.2763 4.6999 15.0001 4.6999Z" />
            </svg>
          }
        </div>
      ))}
      <Button id="button-add" type="button" variant="outlined" className={s.button} onClick={addAdvantage}>+</Button>
      <ErrorMessage show={!!meta.error}>Заполните все поля!</ErrorMessage>

    </div>
  );
}
