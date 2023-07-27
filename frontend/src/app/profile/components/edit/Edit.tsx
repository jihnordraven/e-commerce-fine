'use client'

import Image from 'next/image'
import s from './edit.module.scss'
import TableRow from './tableRow/TableRow'
import { useState } from 'react'
import InfoItem from '../infoItem/InfoItem'

type Props = {}

const Edit: React.FC<Props> = () => {
	const [formData, setFormData] = useState({
		name: '',
		status: '',
		age: '',
		country: '',
		city: ''
	})

	return (
		<div className={s.edit}>
			<h1 className={s.title}>Информация о пользователе</h1>
			<div className={s.table}>
				<TableRow keyValue="Дата регистрации" value="05.25.2023" />
				<TableRow keyValue="ФИО" value="Деуля Антон" canEdit />
				<TableRow keyValue="Статус" value="Посетитель" canEdit />
				<TableRow keyValue="Возраст" value="17" canEdit />
				<TableRow keyValue="Страна" value="Украина" canEdit />
				<TableRow keyValue="Город" value="Говно" canEdit />
			</div>
			{/* <div className={s.actions}>
				<button className={s.actions__button}>Отменить</button>
				<button className={s.actions__button}>Сохранить</button>
			</div> */}
			<div className={s.info}>
				<div className={s.info__item}>
					<InfoItem title="Редактировать профиль" />
				</div>
				<InfoItem title="Активные продажи:" value={14} type="unit" />
				<InfoItem title="Активные заказы:" value={3} type="unit" />
				<InfoItem title="Продано всего:" value={8} type="unit" />
				<InfoItem title="Куплено всего:" value={37} type="unit" />
				<InfoItem title="Заработано всего:" value={178} type="currency" />
				<InfoItem title="Потрачено всего:" value={1178} type="currency" />
			</div>
		</div>
	)
}

export default Edit
