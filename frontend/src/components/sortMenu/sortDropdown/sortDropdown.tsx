'use client'

import { GrSort } from 'react-icons/gr'
import s from './sortDropdown.module.scss'
import { useState } from 'react'
import { FaSort } from 'react-icons/fa'

type Props = {
	sort: any
}

const SortDropdown: React.FC<Props> = ({ sort }) => {
	const [open, setOpen] = useState(false)

	const toggleDropdown = () => {
		setOpen((prev) => !prev)
	}
	return (
		<div className={s.dropdown}>
			<div className={s.dropdown__title} onClick={toggleDropdown}>
				<span className={s.title}>Сортировать по</span>
				<GrSort style={{ display: 'block' }} />
			</div>
			{open && (
				<ul className={s.dropdown__items}>
					{sort.map((item: { id: number; title: string }) => (
						<li className={s.dropdown__item} key={item.id}>
							<div className={s.item__title}>{item.title}</div>
							<FaSort style={{ display: 'block' }} />
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default SortDropdown
