import { createSlice, createAsyncThunk, ThunkAction, Action } from '@reduxjs/toolkit';
import axios from '../../axios';
import { RootState, store } from '../store';
export const fetchData = createAsyncThunk('user/fetchData', async (_, thunkAPI) => {
	const data = (thunkAPI.getState() as RootState).user;
	const response = await axios.post('/', data)
	return response.data
});

interface UsersState {
	nickname: string
	name: string
	sername: string,
	phone: string,
	email: string,
	sex?: "man" | "woman",
	advantages: string[],
	radio?: number,
	checkbox: number[],
	about: string,
}
const initialState: UsersState = {
	nickname: '',
	name: '',
	sername: '',
	phone: '+7 (913) 590-10-34',
	email: 'yakov.nikiforov.1@gmail.com',
	sex: undefined,
	advantages: ['', '', ''],
	radio: undefined,
	checkbox: [],
	about: '',
}
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateUserData: (state, action) => {
			const { payload } = action;
			Object.assign(state, payload)
		},
	},
	extraReducers: (builder) => {
		// Очистка формы после отправки запроса
		builder.addCase(fetchData.fulfilled, (state) => {
			Object.assign(state, initialState)
		});
	},
});
export const { updateUserData } = userSlice.actions;

export default userSlice.reducer;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export type AppDispatch = typeof store.dispatch;