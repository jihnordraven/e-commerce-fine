import { createSlice } from '@reduxjs/toolkit'

type InitialState = {
	isAuth: boolean
	access: null | string
	refresh: null | string
	isOpenAuthModal: boolean
	currentStep: number
	registerMode: boolean
}

const initialState: InitialState = {
	isAuth: false,
	access: null,
	refresh: null,
	isOpenAuthModal: false,
	currentStep: 1,
	registerMode: false
}

const authModalStatus = window.localStorage.getItem('authModalStatus')
console.log(authModalStatus)

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		register(state, action) {
			state.isAuth = true
			state.access = action.payload.access
			state.refresh = action.payload.refresh
			state.isOpenAuthModal = false
		},
		login(state, action) {
			state.isAuth = true
			state.access = action.payload.access
			state.refresh = action.payload.refresh
			state.isOpenAuthModal = false
		},
		setIsAuth(state, action) {
			state.isAuth = true
			state.access = action.payload.access
			state.refresh = action.payload.refresh
		},
		onRegisterMode(state) {
			state.registerMode = true
		},
		offRegisterMode(state) {
			state.registerMode = false
		},
		openAuthModal(state) {
			state.isOpenAuthModal = true
		},
		closeAuthModal(state) {
			state.isOpenAuthModal = false
		},
		routeToStep(state, action) {
			state.currentStep = action.payload
		},
		nextStep(state) {
			state.currentStep += 1
		},
		prevStep(state) {
			state.currentStep -= 1
		},
		logout(state) {
			state.access = null
			state.refresh = null
			state.isAuth = false
		}
	}
})

export default authSlice.reducer
