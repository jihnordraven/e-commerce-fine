'use client'

import Image from 'next/image'
import s from './subProfileItem.module.scss'
import { ILink } from '../ProfileItem'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAppDispatch } from '@/hooks'
import { authSlice } from '@/store/slices/authSlice'

type Props = {
	link: ILink
}

const SubProfileItem: React.FC<Props> = ({ link }) => {
	const [isActive, setIsActive] = useState(false)
	const path = usePathname()

	const pathArray = path.split('/')
	const lastElement = pathArray[pathArray.length - 1]

	useEffect(() => {
		console.log(lastElement)
		if (lastElement === link.slug) {
			setIsActive(true)
		} else {
			setIsActive(false)
		}
	}, [lastElement])

	const router = useRouter()
	const dispatch = useAppDispatch()

	const logout = () => {
		window.localStorage.removeItem('access')
		window.localStorage.removeItem('refresh')
		window.localStorage.removeItem('authModalStatus')
		window.localStorage.removeItem('name')
		window.localStorage.removeItem('email')
		window.localStorage.removeItem('password')
		window.localStorage.removeItem('city')
		window.localStorage.removeItem('country')
		window.localStorage.removeItem('company')
		window.localStorage.removeItem('phone')
		window.localStorage.removeItem('position')
		dispatch(authSlice.actions.logout())
		router.push('localhost:3000/')
		console.log('Logoutet')
	}

	return (
		<Link
			onClick={link.slug === 'Exit' ? logout : undefined}
			href={`/profile/${link.href}`}
			className={`${isActive ? s.active : s.link}`}
			key={link.id}
		>
			<Image
				className={s.icon}
				src={link.linkIcon}
				alt="linkIcon"
				width={25}
				height={25}
			/>
			<span className={s.text}>{link.text}</span>
		</Link>
	)
}

export default SubProfileItem
