'use client'

import { useAppDispatch, useAppSelector } from '@/hooks'
import { authSlice } from '@/store/slices/authSlice'

import { useState, useEffect } from 'react'

import s from './step.module.scss'

type Props = {
	id: number
	text: string
}

const Step: React.FC<Props> = ({ id, text }) => {
	const [active, setActive] = useState(false)
	const currentStep = useAppSelector((state) => state.auth.currentStep)

	const dispatch = useAppDispatch()

	const routeToStep = (id: number) => {
		dispatch(authSlice.actions.routeToStep(id))
		window.localStorage.setItem('step', String(id))
	}

	useEffect(() => {
		if (currentStep === id) {
			setActive(true)
		} else {
			setActive(false)
		}
	}, [currentStep])

	useEffect(() => {
		const step = window.localStorage.getItem('step')
		dispatch(authSlice.actions.routeToStep(Number(step)))
	}, [])

	return (
		<li className={s.step} onClick={() => routeToStep(id)}>
			<div className={active ? s.step__active : s.step__count}>{id}</div>
			<div className={s.step__info}>
				<div className={s.step__number}>step {id}</div>
				<div className={s.step__text}>{text}</div>
			</div>
		</li>
	)
}

export default Step
