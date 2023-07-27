'use client'

import Image from 'next/image'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'

import { useAppDispatch, useAppSelector } from '@/hooks'
import Input from '../input/Input'
import { authSlice } from '@/store/slices/authSlice'

import s from './main.module.scss'
import { AiOutlineArrowRight, AiOutlineCloudUpload } from 'react-icons/ai'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { HiOutlineSelector } from 'react-icons/hi'
import { IoIosRemove, IoMdCheckmark } from 'react-icons/io'
import { BsPlusLg } from 'react-icons/bs'
import { FcCancel } from 'react-icons/fc'
import { toast } from 'react-toastify'
import { useRegisterMutation } from '@/store/api/authApi'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'

const visitorInfo =
	'Добро пожаловать в наш интернет-магазин! Чтобы обеспечить приятное и безопасное покупательское взаимодействие для всех наших клиентов, просим вас ознакомиться с некоторыми правилами использования нашего веб-сайта. Регистрация и конфиденциальность данных: Для совершения покупок в нашем магазине, вам потребуется создать учетную запись. Пожалуйста, убедитесь, что предоставляемая вами информация при регистрации точна и актуальна. Мы гарантируем абсолютную конфиденциальность ваших личных данных и обязуемся использовать их исключительно в соответствии с нашей политикой конфиденциальности. Безопасность аккаунта: Пожалуйста, берегите свои данные для входа в учетную запись, такие как логин и пароль. Не передавайте эти данные третьим лицам, чтобы избежать несанкционированного доступа к вашей учетной записи и личным данным. Выбор и заказ товаров: Мы предоставляем широкий ассортимент товаров высокого качества. Перед тем как оформить заказ, внимательно ознакомьтесь с описанием и характеристиками товара. Если у вас возникли вопросы или необходима дополнительная информация, наша служба поддержки с радостью поможет вам. Оплата и доставка: При оформлении заказа выберите удобный способ оплаты и доставки. Мы гарантируем быструю и безопасную обработку вашего заказа, а также оперативную доставку товаров по указанному адресу. Возврат и обмен товаров: В случае, если вам не подошел товар или вы обнаружили дефект, обязательно свяжитесь с нашим отделом обслуживания клиентов. Мы с радостью поможем вам организовать возврат или обмен товара в соответствии с нашими условиями. Правила использования сайта: При использовании нашего веб-сайта, просим вас соблюдать правила, запрещающие размещение нелегального, оскорбительного или вредоносного контента, а также нарушающего права третьих лиц. Мы оставляем за собой право удалить любой контент, нарушающий данные правила. Спасибо за понимание и соблюдение данных правил. Надеемся, что ваш опыт покупок у нас будет приятным и удовлетворяющим. Если у вас возникли вопросы или затруднения, не стесняйтесь обращаться к нам для получения помощи. С удовольствием станем вашим надежным партнером в онлайн-шопинге!'

type Props = {}

const Main: React.FC<Props> = () => {
	const nameRef = useRef<HTMLInputElement>(null)
	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	const [isCheckBox, setIsCheckBox] = useState(false)
	const [openStatusModal, setOpenStatusModal] = useState(false)
	const [status, setStatus] = useState('Ваш статус')

	const [isEmailError, setIsEmailError] = useState(false)
	const [isNameError, setIsNameError] = useState(false)
	const [isPasswordError, setIsPasswordError] = useState(false)

	useEffect(() => {
		console.log(isNameError)
		console.log(isEmailError)
		console.log(isPasswordError)
	}, [isEmailError, isNameError, isPasswordError])

	const dispatch = useAppDispatch()

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		country: '',
		city: '',
		phone: '',
		company: '',
		position: ''
	})

	const resetConfirm = () => {
		setFormData({
			name: '',
			email: '',
			password: '',
			city: '',
			country: '',
			company: '',
			phone: '',
			position: ''
		})
		window.localStorage.removeItem('name')
		window.localStorage.removeItem('email')
		window.localStorage.removeItem('password')
		window.localStorage.removeItem('city')
		window.localStorage.removeItem('country')
		window.localStorage.removeItem('company')
		window.localStorage.removeItem('phone')
		window.localStorage.removeItem('position')
		setIsConfirmOpen(false)
	}

	const resetEmail = () => {
		setFormData({
			...formData,
			email: ''
		})
	}

	const [registerMutation, { isLoading, data, error }] = useRegisterMutation()

	const handleSubmit = async () => {
		const body = { ...formData }
		const res = await registerMutation(body)
		console.log(res)
		//@ts-ignore
		if (res.error && res.error.status === 400) {
			//@ts-ignore
			res.error.data.message.map((error) => toast.error(error))
		}
		//@ts-ignore
		if (res.error && res.error.status === 409) {
			//@ts-ignore
			toast.error(res.error.data.message)
		}
		//@ts-ignore
		if (res.data && res.data.message === 'Регистрация прошла успешно') {
			//@ts-ignore
			toast.success(res.data.message)
			//@ts-ignore
			const { access, refresh } = res.data
			window.localStorage.setItem('access', access)
			window.localStorage.setItem('refresh', refresh)
			dispatch(authSlice.actions.register({ access, refresh }))
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		window.localStorage.setItem(`${name}`, `${value}`)
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value
		}))
	}

	useEffect(() => {
		const storedFormData: Record<string, string> = {}
		Object.keys(formData).forEach((key) => {
			const storedValue = window.localStorage.getItem(key)
			if (storedValue !== null) {
				storedFormData[key] = storedValue
			}
		})
		setFormData((prevFormData) => ({
			...prevFormData,
			...storedFormData
		}))
	}, [])

	const currentStep = useAppSelector((state) => state.auth.currentStep)

	const handlePrevStep = () => {
		if (currentStep !== 1) {
			dispatch(authSlice.actions.prevStep())
		}
	}

	const handleNextStep = () => {
		if (currentStep !== 4) {
			dispatch(authSlice.actions.nextStep())
		}
	}

	const selectStatus = (status: string) => {
		setStatus(status)
		setOpenStatusModal(false)
	}

	const toggleStatusModal = () => {
		setOpenStatusModal((prev) => !prev)
	}

	const toggleCheckBox = () => {
		setIsCheckBox((prev) => !prev)
	}

	const [image, setImage] = useState(null)

	const handleFileChange = (e: any) => {
		const file = e.target.files[0] || null
		if (file) {
			const reader = new FileReader()
			reader.onload = (event: any) => {
				setImage(event.target.result)
			}
			reader.readAsDataURL(file)
		} else {
			setImage(null)
		}
	}

	const [imageSize, setImageSize] = useState(220)

	const minusZoom = () => {
		if (imageSize > 100) {
			setImageSize((prev) => prev - 20)
		}
	}

	const plusZoom = () => {
		if (imageSize < 205) {
			setImageSize((prev) => prev + 20)
		}
	}

	const offRegisterMode = () => {
		dispatch(authSlice.actions.offRegisterMode())
		window.localStorage.setItem('registerMode', 'false')
	}

	const [isConfirmOpen, setIsConfirmOpen] = useState(false)

	const resetForm = () => {
		const hasData = Object.values(formData).some((value) => value.trim() !== '')
		if (hasData) {
			setIsConfirmOpen(true)
		}
	}

	return (
		<main className={s.main}>
			<div className={s.title}>
				<h2 className={s.title__text}>Presonal info</h2>
				<p className={s.title__desc}>
					Пожалуйста введите ваше Имя, Электронную почту и Пароль
				</p>
			</div>
			<form className={s.form}>
				<div className={s.inputs}>
					{currentStep === 1 && (
						<>
							<Input
								id="name"
								name="name"
								placeholder="Имя"
								label="Имя"
								value={formData.name}
								handleChange={handleChange}
								isError={isNameError}
								mark="asterisk"
								ref={nameRef}
							/>
							<Input
								id="email"
								name="email"
								placeholder="Email"
								label="Email"
								value={formData.email}
								handleChange={handleChange}
								type="email"
								isError={isEmailError}
								mark="asterisk"
								ref={emailRef}
							/>
							<Input
								id="password"
								name="password"
								placeholder="Пароль"
								label="Пароль"
								value={formData.password}
								handleChange={handleChange}
								type="password"
								isError={isPasswordError}
								mark="asterisk"
								ref={passwordRef}
							/>
						</>
					)}
					{currentStep === 2 && (
						<>
							<Input
								id="country"
								name="country"
								placeholder="Страна"
								label="Страна"
								value={formData.country}
								handleChange={handleChange}
								mark="optional"
							/>
							<Input
								id="city"
								name="city"
								placeholder="Город"
								label="Город"
								value={formData.city}
								handleChange={handleChange}
								mark="optional"
							/>
							<Input
								id="phone"
								name="phone"
								placeholder="Норме телефона"
								label="Номер телефона"
								value={formData.phone}
								handleChange={handleChange}
								mark="optional"
								type="tel"
							/>
						</>
					)}
					{currentStep === 3 && (
						<>
							<div className={s.status}>
								<div className={s.status__title} onClick={toggleStatusModal}>
									<h2 className={s.status__title__span}>{status}</h2>
									<span className={s.status__title__icon}>
										<HiOutlineSelector style={{ display: 'block' }} />
									</span>
								</div>
								{openStatusModal && (
									<ul className={s.status__dropdown}>
										<li
											className={s.dropdown__item}
											onClick={() => selectStatus('Посетитель')}
										>
											Посетитель
										</li>
										<li
											className={s.dropdown__item}
											onClick={() => selectStatus('Компания')}
										>
											Компания
										</li>
									</ul>
								)}
							</div>
							{status === 'Компания' && (
								<>
									<Input
										id="company"
										name="company"
										placeholder="Название компании"
										label="Название компании"
										value={formData.company}
										handleChange={handleChange}
										mark="optional"
									/>
									<Input
										id="position"
										name="position"
										placeholder="Ваша должность"
										label="Ваша должность"
										value={formData.position}
										handleChange={handleChange}
										mark="optional"
									/>
								</>
							)}
							{status === 'Посетитель' && (
								<div className={s.visitor}>
									<p className={s.visitor__text}>{visitorInfo}</p>
									<button className={s.visitor__button}></button>
								</div>
							)}
						</>
					)}
					{currentStep === 4 && (
						<div className={s.step4}>
							<div className={s.uploadContainer}>
								<div className={s.upload}>
									{image ? (
										<Image
											className={s.upload__image}
											src={image}
											alt="img"
											width={imageSize}
											height={imageSize}
										/>
									) : (
										<label className={s.upload__label} htmlFor="upload">
											<AiOutlineCloudUpload />
										</label>
									)}
									<input
										accept="image/*"
										className={s.upload__input}
										type="file"
										onChange={handleFileChange}
									/>
								</div>
								{image && (
									<div className={s.options}>
										<div className={s.zoom} onClick={minusZoom}>
											<IoIosRemove style={{ display: 'block' }} />
										</div>
										<div className={s.zoom} onClick={plusZoom}>
											<BsPlusLg style={{ display: 'block' }} />
										</div>
										<div className={s.cancel} onClick={() => setImage(null)}>
											<FcCancel style={{ display: 'block' }} />
										</div>
									</div>
								)}
							</div>
							<div className={s.step4__options}>
								<div className={s.confirm}>
									<div className={s.confirm__checkbox} onClick={toggleCheckBox}>
										{isCheckBox && <IoMdCheckmark />}
									</div>
									<div className={s.confirm__text}>Запомнить меня</div>
								</div>
								<div className={s.confirm}>
									<div className={s.confirm__checkbox} onClick={toggleCheckBox}>
										{isCheckBox && <IoMdCheckmark />}
									</div>
									<div className={s.confirm__text}>
										Я согласен с условиями использования данных
									</div>
								</div>
								<div className={s.confirm}>
									<div className={s.confirm__checkbox} onClick={toggleCheckBox}>
										{isCheckBox && <IoMdCheckmark />}
									</div>
									<div className={s.confirm__text}>
										Я хочу изредка получать сообщения от FINE на свой email
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</form>
			<p className={s.instead}>
				{isConfirmOpen ? (
					<div className={s.confirmReset} onClick={() => resetConfirm()}>
						Подтвердите
					</div>
				) : (
					<div className={s.reset} onClick={() => resetForm()}>
						Сбросить
					</div>
				)}

				<div className={s.login}>
					Уже есть аккаунт?{' '}
					<span className={s.instead__text} onClick={offRegisterMode}>
						Войти
					</span>
				</div>
			</p>
			<div className={s.buttons}>
				{currentStep > 1 && (
					<button className={s.button} onClick={handlePrevStep}>
						<span className={s.button__icon}>
							<AiOutlineArrowLeft style={{ display: 'block' }} />
						</span>
						<span className={s.button__text}>Назад</span>
					</button>
				)}
				{currentStep === 4 ? (
					<>
						<button className={s.button__register} onClick={handleSubmit}>
							Создать аккаунт
						</button>
					</>
				) : (
					<button className={s.buttonNext} onClick={handleNextStep}>
						<span className={s.button__text}>Дальше</span>
						<span className={s.button__icon}>
							<AiOutlineArrowRight style={{ display: 'block' }} />
						</span>
					</button>
				)}
			</div>
		</main>
	)
}

export default Main
