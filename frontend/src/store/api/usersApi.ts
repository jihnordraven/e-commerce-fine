import { IUser } from '@/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
	reducerPath: 'users',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:4200/api/users'
	}),
	tagTypes: ['profile'],
	endpoints: (build) => ({
		getProfile: build.query({
			query: ({ access }: { access: string }) => ({
				url: '/profile',
				method: 'GET',
				headers: {
					Authorization: `Bearer ${access}`
				}
			}),
			providesTags: ['profile']
		}),
		updateProfile: build.mutation({
			query: ({
				name,
				value,
				access
			}: {
				name: string
				value: string
				access: string
			}) => ({
				url: '/',
				method: 'PATCH',
				body: { [name]: value },
				headers: {
					Authorization: `Bearer ${access}`
				}
			}),
			invalidatesTags: ['profile']
		})
	})
})

export const { useGetProfileQuery, useUpdateProfileMutation } = usersApi
