'use client'

import { useState } from 'react'

import { AiOutlineBars, AiOutlineMinus } from 'react-icons/ai'
import s from './dropdown.module.scss'

type Props = {
	name: string
	formDataName: string
	items: any[]
	handleChangeCategory: (name: string, id: number, preview: string) => void
	value: any
	isLabel?: boolean
	isTest?: boolean
}

const iconStyle = { display: 'block' }

const Dropdown: React.FC<Props> = ({
	name,
	formDataName,
	items,
	handleChangeCategory,
	value,
	isLabel,
	isTest
}) => {
	const [isOpenDropdown, setIsOpenDropdown] = useState(false)

	const toggleDropdown = () => {
		setIsOpenDropdown((prev) => !prev)
	}

	const closeDropdown = () => {
		setIsOpenDropdown(false)
	}

	return (
		<div className={`${s.dropdown} ${isTest && s.test}`}>
			{isLabel && <div className={s.name}>{name}</div>}
			<div className={s.dropdown__text} onClick={toggleDropdown}>
				{!isLabel && <div className={s.name}>{name}</div>}
				<div className={s.value}>
					{value ? value : <AiOutlineMinus style={{ display: 'block' }} />}
				</div>
				<span className={s.icon}>
					<AiOutlineBars style={iconStyle} />
				</span>
			</div>
			{isOpenDropdown && !isTest && (
				<ul className={s.items}>
					{items &&
						items.map((item) => (
							<li
								className={s.item}
								onClick={() => {
									handleChangeCategory(formDataName, item.id, item.ru)
									closeDropdown()
								}}
							>
								{item.ru}
							</li>
						))}
				</ul>
			)}
		</div>
	)
}

export default Dropdown
