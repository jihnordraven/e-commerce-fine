'use client'

import s from './options.module.scss'
import { SlArrowDown } from 'react-icons/sl'
import Option from '../option/Option'
import { useGetAllCategoriesQuery } from '@/store/api/categoriesApi'
import { ICategory } from '@/types/items'

type Props = {}

const Options: React.FC<Props> = () => {
	const { data, isLoading, error } = useGetAllCategoriesQuery(1)

	if (isLoading && error) {
		return 'test'
	}

	return (
		<div className={s.categories}>
			{data &&
				data.map((category: ICategory) => <Option category={category} />)}
			<li className={s.more}>
				<div className={s.more__text}>Ещё</div>
				<div className={s.more__icon}>
					<SlArrowDown style={{ display: 'block' }} />
				</div>
				<ul className={s.dropdown}>
					<li className={s.dropdown__item}>Бытовая техника для кухни</li>
					<li className={s.dropdown__item}>Красота и здоровье</li>
				</ul>
			</li>
		</div>
	)
}

export default Options
