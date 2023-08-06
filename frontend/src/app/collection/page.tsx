'use client'

import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'

import Card from '@/components/card/Card'
import SortMenu from '@/components/sortMenu/SortMenu'

import s from './page.module.scss'
import Path from '@/components/path/Path'
import { useGetProductsQuery } from '@/store/api/productsApi'
import CardSkeleton from '@/components/skeletons/cardSkeleton/CardSkeleton'
import { ICard } from '@/types/items'
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'

type Props = {}

const Collection: React.FC<Props> = () => {
	const router = useRouter()
	const search = useSearchParams()
	const params = new URLSearchParams(search.toString())

	const [totalPages, setTotalPages] = useState(1)

	const page = params.get('page') || '1'
	const q = params.get('q') || ''
	const limit = 16
	const slug = params.get('slug') || 'all'

	const { data, isLoading } = useGetProductsQuery(
		{
			page: Number(page),
			q,
			limit,
			slug
		},
		{
			refetchOnMountOrArgChange: true
		}
	)
	useEffect(() => {
		if (data) {
			setTotalPages(Math.ceil(data.total / limit))
		}
	}, [router, data])

	const handlePrevPage = () => {
		if (+page > 1) {
			const prevPage = +page - 1
			params.set('page', String(prevPage))
			router.push(`?${params.toString()}`)
		}
	}

	const handleNextPage = () => {
		if (+page < totalPages) {
			const prevPage = +page + 1
			params.set('page', String(prevPage))
			router.push(`?${params.toString()}`)
		}
	}

	return (
		<div className={s.container}>
			<Path pathItem="Коллекция товаров" />
			<div className={s.content}>
				<div className={s.main}>
					<h1 className={s.title}>Смартфоны и планшеты</h1>
					<div>
						{isLoading ? (
							<div className={s.items}>
								{Array.from({
									//@ts-ignore
									length: data && data.products.length
								}).map(() => (
									<CardSkeleton />
								))}
							</div>
						) : (
							<>
								{data.total > 0 ? (
									<div className={s.itemsContainer}>
										<div className={s.items}>
											{data.products.map((card: ICard) => (
												<Card card={card} size="xl" />
											))}
										</div>
										{data.total > limit && (
											<div className={s.pagination}>
												<div className={s.arrow} onClick={handlePrevPage}>
													<HiArrowNarrowLeft style={{ display: 'block' }} />
												</div>
												<div className={s.pages}>
													<div className={s.currentPage}>{page}</div>
													<div className={s.from}>из</div>
													<div className={s.totalPages}>{totalPages}</div>
												</div>
												<div className={s.arrow} onClick={handleNextPage}>
													<HiArrowNarrowRight style={{ display: 'block' }} />
												</div>
											</div>
										)}
									</div>
								) : (
									<div className={s.empty}>
										<Image
											src="/empty-box.png"
											alt="box"
											width={50}
											height={50}
										/>
										<span className={s.empty__text}>Пока здесь пусто</span>
									</div>
								)}
							</>
						)}
					</div>
				</div>
				<SortMenu />
			</div>
		</div>
	)
}

export default Collection
