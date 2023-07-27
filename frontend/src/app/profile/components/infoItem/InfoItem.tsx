import s from './infoItem.module.scss'
import { useState, useEffect } from 'react'

type Props = {
	title: string
	value?: number
	type?: string
}

const InfoItem: React.FC<Props> = ({ title, value, type }) => {
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
		<div className={s.item}>
			<div className={s.item__title}>{title}</div>
			<div className={s.item__value}>
				{value} {attribute}
			</div>
		</div>
	)
}

export default InfoItem
