import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const payWayApi = createApi({
	reducerPath: 'payWay',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4200/api/pay-ways' }),
	endpoints: (build) => ({
		getAllPayWays: build.query({
			query: () => ({
				url: '/',
				method: 'GET'
			})
		})
	})
})

export const { useGetAllPayWaysQuery } = payWayApi
