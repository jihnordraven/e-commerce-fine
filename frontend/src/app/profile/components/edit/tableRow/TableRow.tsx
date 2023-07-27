'use client'

import { useEffect, useRef, useState } from 'react'

import s from './tableRow.module.scss'
import { AiOutlineEdit } from 'react-icons/ai'

type Props = {
	keyValue: string
	value: string
	canEdit?: boolean
}

const TableRow: React.FC<Props> = ({ keyValue, value, canEdit }) => {
	const [isEditMode, setIsEditMode] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	const onEditMode = () => {
		setIsEditMode(true)
	}

	const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			setIsEditMode(false)
		}
	}

	const handleSubmitBlur = () => {
		setIsEditMode(false)
	}

	useEffect(() => {
		if (isEditMode && inputRef.current) {
			inputRef.current.focus()
		}
	}, [isEditMode])

	return (
		<div className={s.row}>
			<div className={s.key}>{keyValue}</div>
			{isEditMode ? (
				<input
					className={s.input}
					ref={inputRef}
					onBlur={handleSubmitBlur}
					type="text"
					onKeyDown={handleSubmit}
				/>
			) : (
				<>
					{canEdit ? (
						<div className={s.value} onClick={onEditMode}>
							{value}
							<span className={s.edit__icon}>
								<AiOutlineEdit style={{ display: 'block' }} />
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
