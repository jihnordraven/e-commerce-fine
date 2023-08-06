import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'http://localhost:4200/api/auth'
const access = window.localStorage.getItem('access') || null
const refresh = window.localStorage.getItem('refresh') || null
console.log(refresh)

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl,
		prepareHeaders: (headers) => {
			headers.set('Authorization', `Bearer ${access}`)
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
		}),
		refresh: build.mutation({
			query: (body: { refresh: string }) => ({
				url: '/refresh',
				method: 'POST',
				headers: {
					Authorization: `Bearer ${body.refresh}`
				}
			})
		})
	})
})

export const { useRegisterMutation, useLoginMutation, useRefreshMutation } =
	authApi
