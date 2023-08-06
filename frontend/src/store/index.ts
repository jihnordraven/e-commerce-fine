import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './api/authApi'
import { productsSlice } from './slices/productsSlice'
import { mainSlice } from './slices/mainSlice'
import { authSlice } from './slices/authSlice'
import { productsApi } from './api/productsApi'
import { categoriesApi } from './api/categoriesApi'
import { payWayApi } from './api/payWaysApi'
import { currencyApi } from './api/currencyApi'
import { usersApi } from './api/usersApi'

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[productsApi.reducerPath]: productsApi.reducer,
		[categoriesApi.reducerPath]: categoriesApi.reducer,
		[payWayApi.reducerPath]: payWayApi.reducer,
		[currencyApi.reducerPath]: currencyApi.reducer,
		[usersApi.reducerPath]: usersApi.reducer,
		auth: authSlice.reducer,
		main: mainSlice.reducer,
		products: productsSlice.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			authApi.middleware,
			productsApi.middleware,
			categoriesApi.middleware,
			payWayApi.middleware,
			currencyApi.middleware,
			usersApi.middleware
		)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
