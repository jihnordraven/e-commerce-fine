import Link from 'next/link'
import s from './infoItem.module.scss'
import { useState, useEffect } from 'react'

type Props = {
	title: string
	value?: number
	type?: string
	path?: string
}

const InfoItem: React.FC<Props> = ({ title, value, type, path }) => {
	const [attribute, setAttribute] = useState('')

	useEffect(() => {
		if (type === 'unit') {
			setAttribute('шт.')
		} else if (type === 'currency') {
			setAttribute('$')
		} else {
			setAttribute('')
		}
	}, [])

	return (
		<Link href={`${path}`} className={s.item}>
			<div className={s.item__title}>{title}</div>
			<div className={s.item__value}>
				{value} {attribute}
			</div>
		</Link>
	)
}

export default InfoItem
