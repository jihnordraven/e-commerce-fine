import jwtDecode, { JwtPayload } from 'jwt-decode'

interface DecodedAccessToken extends JwtPayload {
	id: number
	email: string
}

export const checkIsAccessTokenValid = (accessToken: string) => {
	if (!accessToken) {
		return null
	}

	try {
		const decodedToken = jwtDecode<DecodedAccessToken>(accessToken)
		const currentTime = Date.now() / 1000
		if (decodedToken.exp && decodedToken.exp < currentTime) {
			return false
		}
		return true
	} catch (e) {
		console.log(e)
	}
}

interface DecodedRefreshToken extends JwtPayload {
	id: number
}

export const checkIsRefreshTokenValid = (refreshToken: string | null) => {
	if (!refreshToken) {
		return null
	}
	try {
		const currentTime = Date.now() / 1000
		const decodedToken = jwtDecode<DecodedRefreshToken>(refreshToken)
		if (decodedToken.exp && decodedToken.exp < currentTime) {
			return false
		}
		return true
	} catch (e) {
		console.log(e)
	}
}
