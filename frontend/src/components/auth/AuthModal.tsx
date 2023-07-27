'use client'

import s from './authModal.module.scss'
import { GrClose } from 'react-icons/gr'
import Main from './main/Main'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { authSlice } from '@/store/slices/authSlice'
import Aside from './aside/Aside'
import Login from './login/Login'
import { useEffect } from 'react'

type Props = {}

const AuthModal: React.FC<Props> = () => {
	const registerMode = useAppSelector((state) => state.auth.registerMode)

	const dispatch = useAppDispatch()

	const closeAuthModal = () => {
		dispatch(authSlice.actions.closeAuthModal())
		window.localStorage.removeItem('authModalStatus')
	}

	useEffect(() => {
		const registerMode = window.localStorage.getItem('registerMode')
		if (registerMode === 'true') {
			dispatch(authSlice.actions.onRegisterMode())
		}
	}, [])

	return (
		<div className={s.modal}>
			{registerMode ? (
				<div className={s.register}>
					<span className={s.cancel} onClick={closeAuthModal}>
						<GrClose />
					</span>
					<Aside />
					<Main />
				</div>
			) : (
				<Login />
			)}
		</div>
	)
}

export default AuthModal
