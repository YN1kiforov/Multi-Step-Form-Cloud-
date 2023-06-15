import React, { ReactNode } from 'react';
import { Field, useField } from 'formik';

import s from './style.module.scss'

interface CheckboxGroupProps {
  name: string;
  children: React.ReactElement[];
  label: string;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ name, children, label }) => {
  const [field, meta, helpers] = useField(name);
  const handleChange = (value: string, checked: boolean) => {
    if (checked) {
      helpers.setValue([...meta.value, value]);
    } else {
      helpers.setValue(meta.value.filter((val: string) => val !== value));
    }
  };

  return (
    <>
      <label className={s.label}>{label}</label>
      {children.map((child) => (
        React.cloneElement(child, {
          name,
          checked: field.value.includes(child.props.value),
          onChange: (e: any) => handleChange(child.props.value, e.target.checked),
        })
      ))}
    </>
  );
};

interface CheckboxProps {
  name?: string;
  value: number;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  checked?: boolean;
  children: ReactNode;
}

export const Checkbox = ({ value, checked, onChange, children, name }: CheckboxProps) => {

  return <label>
    <Field type="checkbox" name={name} value={value} checked={checked}
      onChange={onChange} />
    {children}
  </label>
};






























































// import s from './style.module.scss'
// import React from 'react';
// import { useField } from 'formik';

// interface CheckboxGroupProps {
//   name: string;
//   options: {
//     value: string;
//     label: string;
//   }[];
// }

// const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ name, options }) => {
//   const [, meta, helpers] = useField(name);

//   const handleChange = (value: string, checked: boolean) => {
//     if (checked) {
//       helpers.setValue([...(meta.value || []), value]);
//     } else {
//       helpers.setValue((meta.value || []).filter((val: string) => val !== value));
//     }
//   };

//   return (
//     <div>
//       {options.map((option) => (
//         <Checkbox
//           key={option.value}
//           name={name}
//           value={option.value}
//           label={option.label}
//           onChange={handleChange}
//           checked={meta.value && meta.value.includes(option.value)}
//         />
//       ))}
//     </div>
//   );
// };

// interface CheckboxProps {
//   name: string;
//   value: string;
//   label: string;
//   onChange: (value: string, checked: boolean) => void;
//   checked: boolean;
// }

// const Checkbox: React.FC<CheckboxProps> = ({
//   name,
//   value,
//   label,
//   onChange,
//   checked,
// }) => {
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     onChange(value, event.target.checked);
//   };

//   return (
//     <div>
//       <label>
//         <input
//           type="checkbox"
//           name={name}
//           value={value}
//           checked={checked}
//           onChange={handleChange}
//         />
//         {label}
//       </label>
//     </div>
//   );
// };

// export default CheckboxGroup;
