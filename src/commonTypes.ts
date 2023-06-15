import { RootState } from './redux/store'

export type Step = {
	onNext: (values: any) => void,
	onPrev: (values: any) => void
}