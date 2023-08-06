'use client'

import { useState } from 'react'
import s from './currencyDropdown.module.scss'

type Props = {
	items: any[]
	handleChooseCurrency: (currency_id: number, value: string) => void
	value: string
}

const CurrencyDropdown: React.FC<Props> = ({
	items,
	handleChooseCurrency,
	value
}) => {
	const [isOpenDropdown, setIsOpenDropdown] = useState(false)

	const toggleDropdown = () => {
		setIsOpenDropdown((prev) => !prev)
	}

	const closeDropdown = () => {
		setIsOpenDropdown(false)
	}

	return (
		<span className={s.dropdown}>
			<h1 className={s.value} onClick={toggleDropdown}>
				{value}
			</h1>
			{isOpenDropdown && (
				<ul className={s.items}>
					{items.map((item) => (
						<li
							className={s.item}
							onClick={() => {
								handleChooseCurrency(item.id, item.currency)
								closeDropdown()
							}}
						>
							{item.currency}
						</li>
					))}
				</ul>
			)}
		</span>
	)
}

export default CurrencyDropdown

// useEffect(() => {
// 	const handleOutsideClick = (e: MouseEvent) => {
// 		if (
// 			dropdownRef.current &&
// 			!dropdownRef.current.contains(e.target as Node)
// 		) {
// 			closeDropdown()
// 		}
// 	}

// 	document.addEventListener('click', handleOutsideClick)

// 	return () => {
// 		document.removeEventListener('click', handleOutsideClick)
// 	}
// }, [])
