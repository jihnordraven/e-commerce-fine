'use client'

import Image from 'next/image'
import s from './card.module.scss'
import {
	AiFillEye,
	AiFillHeart,
	AiOutlineEye,
	AiOutlineHeart,
	AiOutlineStar
} from 'react-icons/ai'
import { LuBarChart2 } from 'react-icons/lu'
import { BsCart3 } from 'react-icons/bs'
import { ICard } from '@/types/items'
import { IUser, authSlice } from '@/store/slices/authSlice'
import { useEffect, useState } from 'react'
import {
	useAddViewMutation,
	useToggleLikeMutation
} from '@/store/api/productsApi'
import axios from 'axios'
import { useAppDispatch } from '@/hooks'
import Link from 'next/link'

type Props = {
	status?: string
	size: string
	card: ICard
}

const iconStyle = { display: 'block' }

const Card: React.FC<Props> = (props) => {
	///////////////////////////////////
	let badgeStyles: string
	if (props.status === 'Новинка') {
		badgeStyles = s.badgeNew
	} else if (!props.status) {
		badgeStyles = s.badgeNone
	} else {
		badgeStyles = s.badgeDiscount
	}

	let cardStyle: string
	let descStyle: string
	if (props.size === 'xl') {
		cardStyle = s.cardXL
		descStyle = s.descXL
	} else if (props.size === 'sm') {
		cardStyle = s.cardSM
		descStyle = s.descSM
	} else {
		cardStyle = ''
		descStyle = ''
	}
	///////////////////////////////////

	const [toggleLike] = useToggleLikeMutation()
	const [addView] = useAddViewMutation()

	const dispatch = useAppDispatch()

	const handleLike = async (product_id: number) => {
		const access = window.localStorage.getItem('access') || ''
		const res = await toggleLike({ product_id, access })
		//@ts-ignore
		if (res.error && res.error.status === 403) {
			console.log('refresh')
			const refresh = window.localStorage.getItem('refresh') || ''
			console.log(refresh)
			const res = await axios.post(
				'http://localhost:4200/api/auth/refresh',
				{},
				{
					headers: {
						'Content-type': 'application/json',
						Authorization: `Bearer ${refresh}`
					}
				}
			)
			if (res.status === 201) {
				const { data } = res
				console.log(data)
				window.localStorage.setItem('access', data.access)
				window.localStorage.setItem('refresh', data.refresh)
			} else {
				window.localStorage.removeItem('access')
				window.localStorage.removeItem('refresh')
				dispatch(authSlice.actions.logout())
			}
		}
	}

	const handleView = async (product_id: number) => {
		const res = await addView(product_id)
	}

	const handleAddToComparison = () => {
		console.log('comparison')
	}

	const handleAddToCart = () => {
		console.log('add to cart')
	}

	const handleRouteToCart = () => {
		console.log('route to card')
	}

	const user = window.localStorage.getItem('user') || ''
	const parsedUser: IUser = JSON.parse(user)

	const likes = props.card.likes
	const views = props.card.views

	const [isLiked, setIsLiked] = useState(false)
	const [isViewed, setIsViewed] = useState(false)

	useEffect(() => {
		if (likes.length && likes.some((like) => like.user_id === parsedUser.id)) {
			setIsLiked(false)
		} else {
			setIsLiked(true)
		}
		if (views.length && views.some((view) => view.user_id === parsedUser.id)) {
			setIsViewed(false)
		} else {
			setIsViewed(true)
		}
	}, [likes, parsedUser.id])

	return (
		<div className={cardStyle}>
			<Link
				className={s.content}
				href={`/product/${props.card.id}`}
				onClick={() => handleView(props.card.id)}
			>
				<div className={s.imgContainer}>
					<span className={badgeStyles}>{props.status}</span>
					<Image
						className={s.card__image}
						src="/phones/phone1.png"
						// src={
						// 	props.card && props.card.productImages
						// 		? `http://localhost:4200/uploads/${props.card?.productImages[0].imageUrl}`
						// 		: '/empty-image.png'
						// }
						alt="phone"
						width={props.size === 'sm' ? 100 : 125}
						height={props.size === 'sm' ? 175 : 200}
					/>
				</div>
				<div className={s.textContainer}>
					<p className={descStyle}>
						{props.card.name.length > 55 ? (
							<>{props.card.name.slice(0, 55)} ...</>
						) : (
							<>{props.card.name}</>
						)}
					</p>
					<div className={s.priceContainer}>
						<p className={s.price}>
							{props.card.price.length > 7 ? (
								<>{props.card.price.slice(0, 7)} ...</>
							) : (
								<>{props.card.price}</>
							)}
						</p>
						<span className={s.currency}>
							{props.card && props.card.currency.currency}
						</span>
					</div>
				</div>
			</Link>
			<div className={s.options}>
				<ul className={s.interactions}>
					<li
						className={s.interaction}
						onClick={() => handleLike(props.card.id)}
					>
						<div className={s.interaction__icon}>
							{isLiked ? (
								<AiOutlineHeart style={iconStyle} />
							) : (
								<AiFillHeart style={{ display: 'block', color: '#76bc21' }} />
							)}
						</div>
						<div className={s.interaction__count}>
							{props.card.likes.length > 999 ? (
								<>999+</>
							) : (
								<>{props.card.likes.length}</>
							)}
						</div>
					</li>
					<li className={s.interaction}>
						<div className={s.interaction__icon}>
							<AiOutlineEye style={iconStyle} />
						</div>
						<div className={s.interaction__count}>
							{props.card.views.length > 999 ? (
								<>999+</>
							) : (
								<>{props.card.views.length}</>
							)}
						</div>
					</li>
					<li className={s.interaction}>
						<div className={s.interaction__icon}>
							<AiOutlineStar style={iconStyle} />
						</div>
						<div className={s.interaction__count}>999</div>
					</li>
				</ul>
				<div className={s.options__top}>
					<div className={s.bar} onClick={handleAddToComparison}>
						<LuBarChart2 style={{ display: 'block' }} />
					</div>
				</div>
				<div className={s.options__bottom}>
					<div className={s.bottom__option} onClick={handleAddToCart}>
						<BsCart3 className={s.cart} style={{ display: 'block' }} />
					</div>
					<div className={s.bottom__option} onClick={handleRouteToCart}>
						<AiOutlineEye style={{ display: 'block' }} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Card
