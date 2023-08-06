const handleUnauthorized = async () => {
	const refresh = window.localStorage.getItem('refresh')
	try {
		// Здесь выполните запрос для обновления токена с помощью refresh-токена.
		const response = await fetch('http://localhost:4200/api/auth/refresh', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${refresh}`
			}
		})

		if (!response.ok) {
			window.location.href = '/'
		} else {
			const data = await response.json()
			window.localStorage.setItem('access', data.access)
		}
	} catch (error) {
		console.log(error)
	}
}

const handleRequestWithTokenRefresh = async (requestFn: any, formData: any) => {
	try {
		return await requestFn(formData)
	} catch (error: any) {
		if (error.status === 401) {
			await handleUnauthorized()
			return await requestFn(formData)
		} else {
			throw error
		}
	}
}
