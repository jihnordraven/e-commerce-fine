'use client'

import { useState } from 'react'

import { IOption, ISortItem } from '@/types'
import CheckBox from '@/components/checkBox/CheckBox'

import s from './sortItem.module.scss'

import { IoIosArrowUp } from 'react-icons/io'
import { IoIosArrowDown } from 'react-icons/io'

type Props = {
	sortItem: ISortItem
}

const SortItem: React.FC<Props> = ({ sortItem }) => {
	const arrowStyle = { display: 'block', fontSize: '24px', color: 'gray' }
	const [open, setOpen] = useState(false)

	const toggleDropdown = () => {
		setOpen((prev) => !prev)
	}

	const openDropdown = (e: any) => {
		e.stopPropagation()
		setOpen(true)
	}

	const closeDropdown = (e: any) => {
		e.stopPropagation()
		setOpen(false)
	}

	return (
		<li className={s.item}>
			<div className={s.main} onClick={toggleDropdown}>
				<div className={s.title}>{sortItem.title}</div>
				{open ? (
					<IoIosArrowUp onClick={closeDropdown} style={arrowStyle} />
				) : (
					<IoIosArrowDown onClick={openDropdown} style={arrowStyle} />
				)}
			</div>
			{open && (
				<ul className={s.options}>
					{sortItem.options &&
						sortItem.options.map((item: IOption) => (
							<li className={s.option} key={item.id}>
								<CheckBox />
								<div className={s.name}>{item.name}</div>
								<div className={s.count}>{item.count}</div>
							</li>
						))}
				</ul>
			)}
		</li>
	)
}

export default SortItem
