'use client'

import { useEffect, useRef, useState, ChangeEvent, KeyboardEvent } from 'react'

import s from './tableRow.module.scss'
import { AiOutlineMinus } from 'react-icons/ai'
import { LiaEditSolid } from 'react-icons/lia'
import { useUpdateProfileMutation } from '@/store/api/usersApi'
import { toast } from 'react-toastify'
import 'react-datepicker/dist/react-datepicker.css'

type Props = {
	keyValue: string
	value: number | string | null
	canEdit?: boolean
	name?: string
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void
	handleComfirmation?: () => void
	onEnter?: (e: KeyboardEvent<HTMLInputElement>) => void
	age?: boolean
}

const TableRow: React.FC<Props> = ({
	keyValue,
	value,
	canEdit,
	onChange,
	name,
	age
}) => {
	const [isEditMode, setIsEditMode] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	const onEditMode = () => {
		setIsEditMode(true)
	}

	const handleSubmitBlur = () => {
		setIsEditMode(false)
	}

	useEffect(() => {
		if (isEditMode && inputRef.current) {
			inputRef.current.focus()
		}
	}, [isEditMode])

	const [updateProfile] = useUpdateProfileMutation()

	const handleEnter = async (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			const access = window.localStorage.getItem('access') || ''
			const { name, value } = e.currentTarget
			const res = await updateProfile({ name, value, access })
			//@ts-ignore
			if (res.data) {
				//@ts-ignore
				toast.success(res.data.message)
				setIsEditMode(false)
			}
		}
	}

	return (
		<div className={s.row}>
			<div className={s.key}>{keyValue}</div>
			{isEditMode ? (
				<>
					<input
						type="text"
						className={s.input}
						ref={inputRef}
						onBlur={handleSubmitBlur}
						onKeyDown={handleEnter}
						name={name}
						value={value ? value : ''}
						onChange={onChange}
					/>
				</>
			) : (
				<>
					{canEdit ? (
						<div className={s.value} onClick={onEditMode}>
							{value ? (
								<>
									{value} {age && <>y.o.</>}
								</>
							) : (
								<AiOutlineMinus style={{ display: 'block' }} />
							)}
							<span className={s.edit__icon}>
								<LiaEditSolid style={{ display: 'block' }} />
							</span>
						</div>
					) : (
						<div className={s.value}>{value}</div>
					)}
				</>
			)}
		</div>
	)
}

export default TableRow
