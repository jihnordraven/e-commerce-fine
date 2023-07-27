'use client'

import { useState } from 'react'

import s from './input.module.scss'
import {
	AiOutlineEye,
	AiOutlineEyeInvisible,
	AiOutlineQuestionCircle
} from 'react-icons/ai'
import { PiAsteriskBold } from 'react-icons/pi'

type Props = {
	id: string
	name: string
	label: string
	type?: string
	placeholder: string
	value: string
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	mark?: string
	isError?: boolean
	ref?: React.RefObject<HTMLInputElement>
}

const Input: React.FC<Props> = ({
	id,
	name,
	label,
	type,
	placeholder,
	value,
	handleChange,
	mark,
	isError,
	ref
}) => {
	const [showPassword, setShowPassword] = useState(false)
	const [inputType, setInputType] = useState('password')

	const handleShowPassword = () => {
		setShowPassword(true)
		setInputType('text')
	}

	const handleHidePassword = () => {
		setShowPassword(false)
		setInputType('password')
	}

	return (
		<div className={s.item}>
			<label className={s.label} htmlFor={id}>
				<p className={s.label__text}>{label}</p>
				<span className={s.label__mark}>
					{mark === 'optional' && <AiOutlineQuestionCircle />}
					{mark === 'asterisk' && (
						<PiAsteriskBold
							style={{ fontSize: '10px', color: 'red', marginBottom: '5px' }}
						/>
					)}
				</span>
			</label>
			<div className={s.inputContainer}>
				<input
					className={`${s.input} ${isError ? s.input__active : ''}`}
					id={id}
					name={name}
					type={type === 'password' ? inputType : type || 'text'}
					placeholder={placeholder}
					value={value}
					onChange={handleChange}
				/>
				{type === 'password' && value && (
					<span className={s.action}>
						{showPassword ? (
							<span onClick={() => handleHidePassword()}>
								<AiOutlineEyeInvisible
									style={{ display: 'block' }}
									onClick={handleHidePassword}
								/>
							</span>
						) : (
							<span onClick={() => handleShowPassword()}>
								<AiOutlineEye
									style={{ display: 'block' }}
									onClick={handleShowPassword}
								/>
							</span>
						)}
					</span>
				)}
			</div>
		</div>
	)
}

export default Input
