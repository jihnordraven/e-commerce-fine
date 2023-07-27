'use client'

import Image from 'next/image'
import InfoItem from '../infoItem/InfoItem'
import s from './menu.module.scss'

type Props = {}

const Menu: React.FC<Props> = () => {
	return (
		<div className={s.menu}>
			<h1 className={s.status}>Посетитель</h1>
			<div className={s.imgContainer}>
				<Image
					className={s.avatar}
					src="/profile.jpg"
					alt="avatar"
					fill={true}
				/>
			</div>
			<div className={s.username}>jihnordraven</div>
			<div className={s.email}>jihnordraven@gmail.com</div>
		</div>
	)
}

export default Menu
