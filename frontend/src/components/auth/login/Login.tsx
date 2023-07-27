'use client'

import { useState } from 'react'

import Input from '../input/Input'
import s from './login.module.scss'
import { useAppDispatch } from '@/hooks'
import { authSlice } from '@/store/slices/authSlice'
import { GrClose } from 'react-icons/gr'
import { IoMdCheckmark } from 'react-icons/io'
import { useLoginMutation } from '@/store/api/authApi'
import { toast } from 'react-toastify'

type Props = {}

const Login: React.FC<Props> = () => {
	const dispatch = useAppDispatch()

	const [formData, setFormData] = useState({
		email: '',
		password: ''
	})

	const [loginMutation] = useLoginMutation()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log('hello')
		console.log(formData)
		const body = { ...formData }
		const res = await loginMutation(body)
		console.log(res)
		//@ts-ignore
		if (res.error && res.error.data) {
			//@ts-ignore
			toast.error(res.error.data.message)
		}
		//@ts-ignore
		if (res.data && res.data.message === 'Авторизация прошла успешно') {
			//@ts-ignore
			toast.success(res.data.message)
			//@ts-ignore
			const { access, refresh } = res.data
			window.localStorage.setItem('access', access)
			window.localStorage.setItem('refresh', refresh)
			dispatch(authSlice.actions.login({ access, refresh }))
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value
		}))
	}

	const closeAuthModal = () => {
		dispatch(authSlice.actions.closeAuthModal())
		window.localStorage.removeItem('authModalStatus')
	}

	const hasInputsText =
		formData.email.trim() !== '' && formData.password.trim() !== ''

	const [isCheckBox, setIsCheckBox] = useState(false)

	const toggleCheckBox = () => {
		setIsCheckBox((prev) => !prev)
	}

	const toRegisterModal = () => {
		dispatch(authSlice.actions.onRegisterMode())
	}

	return (
		<div className={s.login}>
			<span className={s.cancel} onClick={closeAuthModal}>
				<GrClose />
			</span>
			<h1 className={s.title}>Авторизация</h1>
			<form className={s.form} onSubmit={handleSubmit}>
				<div className={s.inputs}>
					<Input
						id="email"
						name="email"
						value={formData.email}
						handleChange={handleChange}
						label="Email"
						placeholder="Email"
						type="email"
					/>
					<Input
						id="password"
						name="password"
						value={formData.password}
						handleChange={handleChange}
						label="Пароль"
						placeholder="Пароль"
						type="password"
					/>
				</div>
				<div className={s.confirm}>
					<div className={s.confirm__checkbox} onClick={toggleCheckBox}>
						{isCheckBox && (
							<IoMdCheckmark
								style={{
									background: '#67a41d',
									color: 'white',
									width: '100%',
									height: '100%'
								}}
							/>
						)}
					</div>
					<div className={s.confirm__text}>Запомнить меня</div>
				</div>
				<p className={s.login__instead}>
					Нету аккаунта? Зарегестрируйтесь{' '}
					<span className={s.login__here} onClick={toRegisterModal}>
						здесь
					</span>
				</p>
				<button
					className={`${s.login__button} ${
						hasInputsText ? s.button__active : ''
					}`}
					type="submit"
				>
					Авторизоваться
				</button>
			</form>
		</div>
	)
}

export default Login
