import s from './style.module.scss'
interface StepperProgressProps {
  totalCount: number;
  currentStep: number;
}
export function StepperProgressBar({ totalCount, currentStep }: StepperProgressProps) {

  const progress = 100 / (totalCount - 1) * (currentStep - 1)
  return (
    <div>
      <div className={s.progress}>
        <div className={s.wrapper}>
          <div
            className={s.bar}
          />
          <div
            className={s.progress_bar}
            style={{ width: `${progress}%` }}
          />
          {
            Array(totalCount).fill(1).map((el, i) => {
              return <StepperDot key={i} currentStep={currentStep} dotIndex={i} />
            })
          }
        </div>
      </div>
    </div>
  );
}
interface StepperDotProps {
  dotIndex: number;
  currentStep: number;
}
function StepperDot({ dotIndex, currentStep }: StepperDotProps) {
  let status: "completed" | "pending" | "uncompleted";
  dotIndex = dotIndex + 1
  if (dotIndex < currentStep) {
    status = "completed";
  } else if (dotIndex === currentStep) {
    status = "pending";
  } else {
    status = "uncompleted";
  }

  return (

    <div className={`${s.dot} ${s[status]}`}></div>

  )
}