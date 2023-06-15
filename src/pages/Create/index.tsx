import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { StepperProgressBar } from "../../components/StepperProgressBar/index";
import { Step1 } from "../../components/Step1/index";
import { Step2 } from "../../components/Step2/index";
import { Step3 } from "../../components/Step3/index";
import { updateUserData } from '../../redux/slices/userSlice';

export const Create = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [currentStep, setCurrentStep] = useState(1)


	const totalCount = 3
	const Prev = (values: any): void => {
		dispatch(updateUserData(values))
		setCurrentStep(prev => Math.max(prev - 1, 1))
		if (currentStep === 1) navigate("/");

	}
	const Next = (values: any): void => {
		dispatch(updateUserData(values));
		setCurrentStep(prev => Math.min(prev + 1, totalCount))
	}
	return (
		<div className="container">
			<StepperProgressBar totalCount={totalCount} currentStep={currentStep} />
			{currentStep === 1 && <Step1 onNext={Next} onPrev={Prev} />}
			{currentStep === 2 && <Step2 onNext={Next} onPrev={Prev} />}
			{currentStep === 3 && <Step3 onNext={Next} onPrev={Prev} />}
		</div>
	);
}
