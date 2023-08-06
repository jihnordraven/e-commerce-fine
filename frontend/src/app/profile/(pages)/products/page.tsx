'use client'

import SortDropdown from '@/components/sortMenu/sortDropdown/sortDropdown'
import { sort } from '@/data'
import s from './page.module.scss'
import Card from '@/components/card/Card'
import Link from 'next/link'
import { ICard } from '@/types/items'
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { useRouter, useSearchParams } from 'next/navigation'
import { TfiBackLeft } from 'react-icons/tfi'
import { useGetMyProductsQuery } from '@/store/api/productsApi'
import axios from 'axios'
import Image from 'next/image'

type Props = {}

const Products: React.FC<Props> = () => {
	const router = useRouter()

	const search = useSearchParams()
	const params = new URLSearchParams(search.toString())

	const limit = 16
	const page = params.get('page') || 1
	const q = params.get('q') || ''

	const pageToQuery = +page

	const { data, isLoading, error, refetch } = useGetMyProductsQuery({
		page: pageToQuery,
		q
	})
	//@ts-ignore
	if (error && error.status === 403) {
		const getNewTokens = async () => {
			const refresh = window.localStorage.getItem('refresh')
			const res = await axios.post(
				'http://localhost:4200/api/auth/refresh',
				{},
				{
					headers: {
						'Content-type': 'application/json',
						Authorization: `Bearer ${refresh}`
					}
				}
			)
			if (res.status === 201) {
				window.localStorage.setItem('access', res.data.access)
				window.localStorage.setItem('refresh', res.data.refresh)
				refetch()
			}
		}
		getNewTokens()
	}
	useEffect(() => {
		setTotalPages(data && Math.ceil(+data?.totalCountForQuery / limit))
	}, [data])

	const [totalPages, setTotalPages] = useState<null | number>(0)

	const handlePrevPage = () => {
		if (+page > 1) {
			const prevPage = +page - 1
			params.set('page', String(prevPage))
			router.push(`?${params.toString()}`)
		}
	}

	const handleNextPage = () => {
		if (totalPages && +page < totalPages) {
			const nextPage = +page + 1
			params.set('page', String(nextPage))
			router.push(`?${params.toString()}`)
		}
	}

	const [value, setValue] = useState(q || '')
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
		const { value } = e.target

		if (timeoutId) {
			clearTimeout(timeoutId)
		}

		const newTimeoutId = setTimeout(() => {
			if (value) {
				params.set('q', value.trim())
				params.set('page', '1')
				router.push(`?${params.toString()}`)
			} else {
				params.delete('q')
				router.push(`?${params.toString()}`)
			}
		}, 500)

		setTimeoutId(newTimeoutId)
	}

	const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			const trimmedValue = value.trim()
			if (trimmedValue.length >= 1 && trimmedValue !== '') {
				params.set('q', value)
				params.set('page', '1')
				router.push(`?${params.toString()}`)
			} else {
				params.delete('q')
				router.push(`?${params.toString()}`)
			}
		}
	}

	return (
		<div className={s.container}>
			<div className={s.content}>
				<div className={s.filters}>
					<Link href="/profile/products/create" className={s.add}>
						Создать объявление
					</Link>
					<input
						className={s.input}
						type="text"
						placeholder="Поиск"
						value={value}
						onChange={handleChange}
						onKeyDown={handleSearch}
					/>
					<p className={s.all}>
						Всего (<span className={s.all__count}>{data && data.total}</span>)
					</p>
					<div className={s.sort}>
						<SortDropdown sort={sort} />
					</div>

					<div className={s.pagination}>
						{totalPages ? (
							<>
								<AiOutlineArrowLeft
									className={s.pagination__icon}
									onClick={handlePrevPage}
								/>

								<div className={s.page}>
									<div className={s.page__count}>{page}</div>
									<div className={s.page__text}>из</div>
									<div className={s.page__count}>{totalPages}</div>
								</div>
								<AiOutlineArrowRight
									className={s.pagination__icon}
									onClick={handleNextPage}
								/>
							</>
						) : (
							<div className={s.current}>Текущая</div>
						)}
					</div>
				</div>
				<div className={s.main}>
					{isLoading ? (
						<>loading</>
					) : (
						<div className={s.items}>
							{data && data.products.length ? (
								data.products.map((card: ICard) => (
									<Card key={card.id} card={card} size="sm" />
								))
							) : (
								<div className={s.empty}>Ничего не найдено</div>
							)}
						</div>
					)}
				</div>
			</div>
			<div className={s.menu}>menu</div>
		</div>
	)
}

export default Products
