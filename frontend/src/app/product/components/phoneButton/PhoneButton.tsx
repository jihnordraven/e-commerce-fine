'use client'

import { useState, useEffect } from 'react'

import s from './phoneButton.module.scss'

type Props = {
	phone: string
}

const PhoneButton: React.FC<Props> = ({ phone }) => {
	const [isShowPhone, setIsShowPhone] = useState<boolean>(false)

	useEffect(() => {
		const isShowPhone = window.localStorage.getItem('showPhone')
		if (isShowPhone) {
			setIsShowPhone(true)
		} else {
			setIsShowPhone(false)
		}
	}, [])

	const handleShowPhone = () => {
		setIsShowPhone(true)
		window.localStorage.setItem('showPhone', 'true')
	}

	const handleHidePhone = (e: any) => {
		e.stopPropagation()
		setIsShowPhone(false)
		window.localStorage.removeItem('showPhone')
	}

	return (
		<button className={s.button} onClick={handleShowPhone}>
			{isShowPhone ? (
				<div className={s.phone}>
					<span className={s.phone__number}>{phone}</span>
					<span className={s.phone__close} onClick={handleHidePhone}>
						Скрыть
					</span>
				</div>
			) : (
				<div className={s.button__text}>Показать телефон</div>
			)}
		</button>
	)
}

export default PhoneButton
