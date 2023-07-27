'use client'

import React, { useState } from 'react'

import Card from '@/components/card/Card'
import SortMenu from '@/components/sortMenu/SortMenu'

import s from './page.module.scss'
import { HiArrowNarrowLeft } from 'react-icons/hi'
import { HiArrowNarrowRight } from 'react-icons/hi'
import Path from '@/components/path/Path'

type Props = {}

const Collection: React.FC<Props> = () => {
	const [currentPage, setCurrentPage] = useState('1')

	const totalProducts = 34
	const productsPerPage = 16
	const totalPages = Math.ceil(totalProducts / productsPerPage)

	const handleChangePage = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentPage(e.target.value)
	}

	return (
		<div className={s.container}>
			<Path pathItem="Коллекция товаров" />
			<div className={s.content}>
				<div className={s.main}>
					<h1 className={s.title}>Смартфоны и планшеты</h1>
					<div className={s.items}>
						<Card
							image="/phones/phone1.png"
							status="Новинка"
							size="xl"
							oldPrice={40000}
						/>
						<Card
							image="/phones/phone2.png"
							status="-9%"
							size="xl"
							oldPrice={50000}
						/>
						<Card image="/phones/phone3.png" status="-28%" size="xl" />
						<Card image="/phones/phone1.png" status="Новинка" size="xl" />
						<Card image="/phones/phone2.png" status="Новинка" size="xl" />
						<Card image="/phones/phone3.png" status="-48%" size="xl" />
						<Card image="/phones/phone1.png" status="Новинка" size="xl" />
						<Card image="/phones/phone2.png" status="Новинка" size="xl" />
						<Card image="/phones/phone3.png" status="Новинка" size="xl" />
						<Card image="/phones/phone1.png" status="Новинка" size="xl" />
						<Card image="/phones/phone2.png" status="-24%" size="xl" />
						<Card
							image="/phones/phone3.png"
							status="Новинка"
							size="xl"
							oldPrice={79000}
						/>
						<Card image="/phones/phone1.png" status="Новинка" size="xl" />
						<Card
							image="/phones/phone2.png"
							status="Новинка"
							size="xl"
							oldPrice={50000}
						/>
						<Card image="/phones/phone3.png" status="Новинка" size="xl" />
						<Card image="/phones/phone1.png" status="Новинка" size="xl" />
					</div>
					<div className={s.pagination}>
						<div className={s.arrow}>
							<HiArrowNarrowLeft style={{ display: 'block' }} />
						</div>
						<div className={s.pages}>
							<input
								className={s.currentPage}
								type="number"
								value={currentPage}
								onChange={handleChangePage}
							/>
							<div className={s.from}>из</div>
							<div className={s.totalPages}>{totalPages}</div>
						</div>
						<div className={s.arrow}>
							<HiArrowNarrowRight style={{ display: 'block' }} />
						</div>
					</div>
				</div>
				<SortMenu />
			</div>
		</div>
	)
}

export default Collection
