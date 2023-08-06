import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = {
	baseUrl: 'http://localhost:4200/api',
	access: window.localStorage.getItem('access')
}

export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: fetchBaseQuery({ baseUrl: baseQuery.baseUrl }),
	tagTypes: ['products'],
	endpoints: (build) => ({
		getProducts: build.query({
			query: ({
				page,
				q,
				limit,
				slug
			}: {
				page: number
				q: string
				limit: number
				slug: string | null
			}) => ({
				url: `/products?slug=${slug}&page=${page}&q=${q}&limit=${limit}`,
				method: 'GET',
				tags: ['products']
			}),
			providesTags: ['products']
		}),
		getMyProducts: build.query({
			query: ({ page, q }: { page: number; q: string }) => ({
				url: `/products/my?page=${page}&q=${q}`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${window.localStorage.getItem('access')}`
				}
			}),
			providesTags: ['products']
		}),
		getProductsForSlider: build.query({
			query: () => ({
				url: '/products/slider',
				method: 'GET'
			})
		}),
		getProduct: build.query({
			query: (body: { id: number }) => ({
				url: `/products/${body.id}`
			})
		}),
		createProduct: build.mutation({
			query: ({ formData, access }) => ({
				url: '/products',
				method: 'POST',
				body: formData,
				headers: {
					Authorization: `Bearer ${access}`
				}
			}),
			invalidatesTags: ['products']
		}),
		toggleLike: build.mutation({
			query: (body: { product_id: number; access: string }) => ({
				url: '/likes',
				method: 'POST',
				body: { product_id: body.product_id },
				headers: {
					Authorization: `Bearer ${body.access}`
				}
			}),
			invalidatesTags: ['products']
		}),
		addView: build.mutation({
			query: (product_id: number) => ({
				url: '/views',
				method: 'POST',
				body: { product_id },
				headers: {
					Authorization: `Bearer ${baseQuery.access}`
				}
			})
		})
	})
})

export const {
	useGetProductsQuery,
	useGetMyProductsQuery,
	useGetProductsForSliderQuery,
	useGetProductQuery,
	useCreateProductMutation,
	useToggleLikeMutation,
	useAddViewMutation
} = productsApi
