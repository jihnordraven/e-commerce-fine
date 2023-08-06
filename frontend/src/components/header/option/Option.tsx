'use client'

import Link from 'next/link'
import s from './option.module.scss'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ICategory } from '@/types/items'

type Props = {
	category: ICategory
}

const Option: React.FC<Props> = ({ category }) => {
	const [isActive, setIsActive] = useState(false)

	const search = useSearchParams()
	const params = new URLSearchParams(search.toString())
	const slug = params.get('slug')

	useEffect(() => {
		if (slug === category.slug) {
			setIsActive(true)
		} else {
			setIsActive(false)
		}
	}, [slug])

	return (
		<Link
			className={`${s.option} ${isActive && s.active}`}
			href={`/collection?slug=${category.slug}`}
		>
			{category.ru}
		</Link>
	)
}

export default Option
