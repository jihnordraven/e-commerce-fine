'use clietn'
import { useState } from 'react'
import { sortMenuMobileAndTables } from '../../data/sortMenu'
import { ISortItem } from '@/types'
import SortItem from './sortItem/SortItem'

import { GrSort } from 'react-icons/gr'
import { FaSort } from 'react-icons/fa'
import s from './sortMenu.module.scss'
import { sort } from '@/data'
import SortDropdown from './sortDropdown/sortDropdown'

type Props = {}

const SortMenu: React.FC<Props> = () => {
	return (
		<div className={s.container}>
			<SortDropdown sort={sort} />
			<ul className={s.options}>
				{sortMenuMobileAndTables.map((sortItem: ISortItem) => (
					<SortItem sortItem={sortItem} />
				))}
			</ul>
		</div>
	)
}

export default SortMenu
