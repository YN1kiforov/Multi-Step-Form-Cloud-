import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import React from 'react';
import { useDispatch } from 'react-redux';

import { TextField } from '../../components/Textfield';
import { Avatar } from '../../components/Avatar';
import { Button } from '../../components/Button';
import { updateUserData, AppDispatch } from '../../redux/slices/userSlice';

import s from './style.module.scss'

const Schema = Yup.object().shape({
	phone: Yup.string().test(
		"Неправильный номер телефона",
		"Введите номер телефона",
		(value) => !!value && !value.includes('_'),
	),
	email: Yup.string().email('Неправильный email').required('Обязательное поле'),
});

function InputMaskField({ field, form, ...props }: any) {
	return (
		<InputMask
			{...field}
			{...props}
			value={field.value || ''}
			onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
				field.onChange(e);
			}}
			alwaysShowMask={true}
		>
			{(inputProps: any) => <TextField {...inputProps} />}
		</InputMask>
	);
}
export const Home = () => {
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();

	return (
		<div className="container">
			<div className={s.header}>
				<Avatar>ЯВ</Avatar>
				<div className={s.data}>
					<span className={s.name}>Яков Никифоров</span>
					<ul className={s.list}>
						<li><a href="https://t.me/yakovBlind">Telegram</a></li>
						<li><a href="https://github.com/YN1kiforov">Github</a></li>
						<li><a href="https://krasnoyarsk.hh.ru/applicant/resumes/view?resume=cd37170eff083533380039ed1f6768516c4644">Resume</a></li>
					</ul>
				</div>
			</div>
			<Formik
				initialValues={{ phone: "", email: "" }}
				validationSchema={Schema}
				onSubmit={(values) => {
					dispatch(updateUserData(values));
					navigate("/create");
				}}
			>
				{props => (
					<Form className={s.form} onSubmit={props.handleSubmit}>
						<Field
							label="Номер телефона"
							id="phone"
							name="phone"
							component={InputMaskField}
							mask="+7 (999) 999-99-99"
							type="tel"
						/>
						<TextField placeholder="tim.jennings@example.com" name="email" type="text" label="Email" />
						<Button type="submit" variant="filled">Начать</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
}
