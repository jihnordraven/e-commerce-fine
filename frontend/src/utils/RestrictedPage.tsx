'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { checkIsRefreshTokenValid } from './checkTokens'
import { useAppDispatch } from '@/hooks'
import { authSlice } from '@/store/slices/authSlice'

type Props = {
	children: React.ReactNode
}

export const RestrictedPage: React.FC<Props> = ({ children }) => {
	const router = useRouter()
	const dispatch = useAppDispatch()
	useEffect(() => {
		const refresh = window.localStorage.getItem('refresh')
		const isValidRefreshToken = checkIsRefreshTokenValid(refresh)
		if (!isValidRefreshToken) {
			router.push('/')
			dispatch(authSlice.actions.logout())
		}
	}, [router])

	return <>{children}</>
}
