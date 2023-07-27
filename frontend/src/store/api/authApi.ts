import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = {
	baseUrl: 'http://localhost:4200/api/auth',
	access: window.localStorage.getItem('access') || null
}

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: baseQuery.baseUrl,
		prepareHeaders: (headers) => {
			headers.set('Authorization', `Bearer ${baseQuery.access}`)
			return headers
		}
	}),
	endpoints: (build) => ({
		register: build.mutation({
			query: (body) => ({
				url: '/register',
				method: 'POST',
				body: body
			})
		}),
		login: build.mutation({
			query: (body) => ({
				url: '/login',
				method: 'POST',
				body: body
			})
		})
	})
})

export const { useRegisterMutation, useLoginMutation } = authApi
