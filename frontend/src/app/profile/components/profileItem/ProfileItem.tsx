'use client'

import s from './profileItem.module.scss'
import { IoIosArrowDown } from 'react-icons/io'
import { IoIosArrowUp } from 'react-icons/io'
import { GoHome } from 'react-icons/go'
import { useState } from 'react'
import Image from 'next/image'
import SubProfileItem from './subProfileItem/subProfileItem'
import { useAppDispatch } from '@/hooks'
import { authSlice } from '@/store/slices/authSlice'
import { useRouter } from 'next/navigation'

export interface ILink {
	id: number
	linkIcon: string
	text: string
	slug: string
	href: string
}

type Props = {
	id: number
	title: string
	icon: string
	links: ILink[]
}

const ProfileItem: React.FC<Props> = ({ title, icon, links }) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(true)

	const router = useRouter()
	const dispatch = useAppDispatch()

	const toggleDropdown = () => {
		setIsDropdownOpen((prev) => !prev)
	}

	return (
		<div className={s.item}>
			<div className={s.item__title} onClick={toggleDropdown}>
				<div className={s.title__main}>
					<Image
						className={s.title__icon}
						src={icon}
						alt="icon"
						width={25}
						height={25}
					/>
					<h2 className={s.title__text}>{title}</h2>
				</div>
				{isDropdownOpen ? (
					<span className={s.title__arrow}>
						<IoIosArrowUp style={{ display: 'block' }} />
					</span>
				) : (
					<span className={s.title__arrow}>
						<IoIosArrowDown style={{ display: 'block' }} />
					</span>
				)}
			</div>
			{isDropdownOpen && (
				<ul className={s.item__links}>
					{links.map((link: ILink) => (
						<SubProfileItem key={link.id} link={link} />
					))}
				</ul>
			)}
		</div>
	)
}

export default ProfileItem
