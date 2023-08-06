import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const currencyApi = createApi({
	reducerPath: 'currencies',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:4200/api/currency'
	}),
	endpoints: (build) => ({
		getAllCurrencies: build.query({
			query: () => ({
				url: '/',
				method: 'GET'
			})
		})
	})
})

export const { useGetAllCurrenciesQuery } = currencyApi
