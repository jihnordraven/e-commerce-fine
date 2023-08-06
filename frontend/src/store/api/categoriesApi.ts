import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const categoriesApi = createApi({
	reducerPath: 'categories',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:4200/api/categories'
	}),
	endpoints: (build) => ({
		getAllCategories: build.query({
			query: () => ({
				url: '/',
				method: 'GET'
			})
		})
	})
})

export const { useGetAllCategoriesQuery } = categoriesApi
