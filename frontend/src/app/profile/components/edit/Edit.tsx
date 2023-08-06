'use client'

import Image from 'next/image'
import s from './edit.module.scss'
import TableRow from './tableRow/TableRow'
import { useState, useEffect } from 'react'
import InfoItem from '../infoItem/InfoItem'
import {
	useGetProfileQuery,
	useUpdateProfileMutation
} from '@/store/api/usersApi'
import { IUser } from '@/types'
import axios from 'axios'
import { toast } from 'react-toastify'
import Table from './table/Table'

type Props = {}

const Edit: React.FC<Props> = () => {
	const [access, setAccess] = useState<string>('')

	useEffect(() => {
		setAccess(window.localStorage.getItem('access') || '')
	}, [])

	const { data, isLoading, error } = useGetProfileQuery({ access })

	if (error) return <>error</>
	if (isLoading) return <>loading</>

	return (
		<div className={s.edit}>
			<h1 className={s.title}>Информация о пользователе</h1>
			<div className={s.profile}>
				<Table user={data} />
				<div className={s.user}>
					<div className={s.imgContainer}>
						<Image
							className={s.avatar}
							src="/profile.jpg"
							alt="profile"
							fill={true}
						/>
					</div>
					<div className={s.user__info}>
						<span className={s.email}>{data.email}</span>
					</div>
				</div>
			</div>
			<div className={s.info}>
				<div className={s.info__item}>
					<InfoItem path="/profile" title="Редактировать профиль" />
				</div>
				<InfoItem
					path="/profile/products"
					title="Активные продажи:"
					value={14}
					type="unit"
				/>
				<InfoItem
					path="/profile/orders"
					title="Активные заказы:"
					value={3}
					type="unit"
				/>
				<InfoItem title="Продано всего:" value={8} type="unit" />
				<InfoItem title="Куплено всего:" value={37} type="unit" />
				<InfoItem title="Заработано всего:" value={178} type="currency" />
				<InfoItem title="Потрачено всего:" value={1178} type="currency" />
			</div>
		</div>
	)
}

export default Edit
