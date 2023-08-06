import { createSlice } from '@reduxjs/toolkit'

type InitialState = {
	isHeaderShowing: boolean
}

const initialState: InitialState = {
	isHeaderShowing: true
}

export const mainSlice = createSlice({
	name: 'main',
	initialState,
	reducers: {
		showHeader(state) {
			state.isHeaderShowing = true
		},
		hideHeader(state) {
			state.isHeaderShowing = false
		}
	}
})
