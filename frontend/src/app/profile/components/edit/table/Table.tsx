'use client'

import { IUser } from '@/types'
import TableRow from '../tableRow/TableRow'
import s from './table.module.scss'
import { useForm } from 'react-hook-form'
import { useState, ChangeEvent } from 'react'

type Props = {
	user: IUser
}

const Table: React.FC<Props> = ({ user }) => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()

	interface IFormData {
		name: string
		email: string
		status: string
		age: number | null
		country: string | null
		city: string | null
	}

	const [formData, setFormData] = useState<IFormData>({
		name: user.name,
		email: user.email,
		status: user.status,
		age: user.age,
		country: user.country,
		city: user.city
	})

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value
		}))
	}

	console.log(user)
	return (
		<div className={s.table}>
			<TableRow keyValue="Дата регистрации" value={user.createdAt} />
			<TableRow
				name="name"
				keyValue="Имя"
				value={formData.name}
				onChange={handleChange}
				canEdit
			/>
			<TableRow
				name="status"
				keyValue="Статус"
				value={formData.status}
				onChange={handleChange}
				canEdit
			/>
			<TableRow
				name="email"
				keyValue="Email"
				value={formData.email}
				onChange={handleChange}
				canEdit
			/>
			<TableRow
				name="age"
				keyValue="Возраст"
				value={formData.age}
				onChange={handleChange}
				canEdit
				age
			/>
			<TableRow
				name="country"
				keyValue="Страна"
				value={formData.country}
				onChange={handleChange}
				canEdit
			/>
			<TableRow
				name="city"
				keyValue="Город"
				value={formData.city}
				onChange={handleChange}
				canEdit
			/>
		</div>
	)
}

export default Table
