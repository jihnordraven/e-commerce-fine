'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { checkIsRefreshTokenValid } from './checkTokens'

type Props = {
	children: React.ReactNode
}

export const RestrictedPage: React.FC<Props> = ({ children }) => {
	const router = useRouter()
	useEffect(() => {
		const refresh = window.localStorage.getItem('refresh')
		const isValidRefreshToken = checkIsRefreshTokenValid(refresh)
		if (!isValidRefreshToken) {
			router.push('/')
		}
	}, [router])

	return <>{children}</>
}
