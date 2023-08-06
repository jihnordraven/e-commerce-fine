// // api.ts

// import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// const apiInstance: AxiosInstance = axios.create({
// 	baseURL: '/api' // Set your API base URL
// })

// async function refreshAccessToken(): Promise<string> {
// 	const refreshToken: string | null = window.localStorage.getItem('refresh')

// 	if (!refreshToken) {
// 		throw new Error('Refresh token not found.')
// 	}

// 	try {
// 		const response: AxiosResponse = await apiInstance.post('/auth/refresh', {
// 			refresh_token: refreshToken
// 		})

// 		const {
// 			access_token,
// 			new_refresh_token
// 		}: { access_token: string; new_refresh_token: string } = response.data

// 		window.localStorage.setItem('access', access_token)
// 		window.localStorage.setItem('refresh', new_refresh_token)

// 		return access_token
// 	} catch (error) {
// 		throw new Error('Failed to refresh access token.')
// 	}
// }

// function logoutUser(): void {
// 	window.localStorage.removeItem('access')
// 	window.localStorage.removeItem('refresh')
// 	// You can also redirect the user to the logout page if needed.
// }

// apiInstance.interceptors.request.use(
// 	(config: any) => {
// 		const accessToken: string | null = window.localStorage.getItem('access')

// 		if (accessToken) {
// 			config.headers['Authorization'] = `Bearer ${accessToken}`
// 		}

// 		return config
// 	},
// 	(error) => {
// 		return Promise.reject(error)
// 	}
// )

// apiInstance.interceptors.response.use(
// 	(response: AxiosResponse) => {
// 		return response
// 	},
// 	async (error) => {
// 		const originalRequest: any = error.config

// 		if (
// 			error.response &&
// 			error.response.status === 401 &&
// 			!originalRequest._retry
// 		) {
// 			originalRequest._retry = true

// 			try {
// 				const accessToken: string = await refreshAccessToken()
// 				originalRequest.headers['Authorization'] = `Bearer ${accessToken}`
// 				return apiInstance(originalRequest)
// 			} catch (error) {
// 				logoutUser()
// 				// Redirect the user to the logout page or show a message indicating they have been logged out
// 				// Or any other custom handling you want for this scenario.
// 				return Promise.reject(error)
// 			}
// 		}

// 		return Promise.reject(error)
// 	}
// )

// export default apiInstance
