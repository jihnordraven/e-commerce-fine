'use client'

import s from './checkBox.module.scss'
import { IoMdCheckmark } from 'react-icons/io'
import { useState } from 'react'

type Props = {
	border?: string
	background?: string
}

const CheckBox: React.FC<Props> = ({ border, background }) => {
	const [active, setActive] = useState(false)

	const checkToggle = () => {
		setActive((prev) => !prev)
	}

	return (
		<div
			className={s.checkBox}
			onClick={checkToggle}
			style={
				border && background
					? { border, background }
					: { border: '', background: '' }
			}
		>
			{active ? (
				<div className={s.mark}>
					<IoMdCheckmark />
				</div>
			) : (
				<></>
			)}
		</div>
	)
}

export default CheckBox
