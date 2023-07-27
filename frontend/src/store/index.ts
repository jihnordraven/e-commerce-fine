import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import mainReducer from './slices/mainSlice'
import { authApi } from './api/authApi'

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		auth: authReducer,
		main: mainReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(authApi.middleware)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
