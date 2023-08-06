import { createSlice } from '@reduxjs/toolkit'

type InitialState = {
	isOpenModal: boolean
	isOpenCategoryDropdown: boolean
}

const initialState: InitialState = {
	isOpenModal: false,
	isOpenCategoryDropdown: false
}

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		openModal(state) {
			state.isOpenModal = true
		},
		closeModal(state) {
			state.isOpenModal = false
		},
		toggleCategoryDropdown(state) {
			state.isOpenCategoryDropdown = !state.isOpenCategoryDropdown
		}
	}
})
