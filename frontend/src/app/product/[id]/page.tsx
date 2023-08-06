'use client'

import s from './page.module.scss'
import Image from 'next/image'
import React from 'react'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import { BiBarChart, BiRuble } from 'react-icons/bi'
import {
	AiOutlineArrowRight,
	AiOutlineHeart,
	AiOutlineShoppingCart
} from 'react-icons/ai'
import { TbTruckDelivery } from 'react-icons/tb'
import { GoSmiley } from 'react-icons/go'
import { RiFlag2Line } from 'react-icons/ri'
import { useState } from 'react'
import { useGetProductQuery } from '@/store/api/productsApi'
import Row from '@/components/row/Row'
import Rate from '../components/rate/Rate'
import Action from '../components/action/Action'
import Keyword from '../components/keyword/Keyword'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { useRouter } from 'next/navigation'
import { CgToolbarRight } from 'react-icons/cg'
import { BsReverseLayoutSidebarReverse } from 'react-icons/bs'
import PhoneButton from '../components/phoneButton/PhoneButton'
import Button from '../components/button/Button'
import Promotions from '@/components/promotions/Promotions'

type Props = {
	params: any
}

const ProductPage: React.FC<Props> = ({ params }) => {
	console.log(params.id)

	const { data, isLoading, error } = useGetProductQuery({ id: params.id })
	const [isVerticalMode, setIsVerticalMode] = useState(false)

	console.log(data)
	console.log(error)

	const router = useRouter()

	if (isLoading) return <>loading</>
	if (error) {
		router.push('/')
	}

	const iconStyle = { display: 'block' }

	const handleChangeMode = () => {
		setIsVerticalMode((prev) => !prev)
	}

	return (
		<div className={s.container}>
			<div className={s.path}>Главная / Ноутбуки, планшеты и компьютеры</div>
			{data && (
				<div className={s.content}>
					<div className={s.header}>
						<h1 className={s.title}>{data.product.name}</h1>
						<ul className={s.actions}>
							<Rate />
							<Action
								icon={<AiOutlineHeart style={{ display: 'block' }} />}
								text="В избранное"
							/>
							<Action
								icon={<BiBarChart style={{ display: 'block' }} />}
								text="Добавить в сравнение"
							/>
							<div className={s.mode} onClick={handleChangeMode}>
								<span className={s.mode__icon}>
									<BsReverseLayoutSidebarReverse style={{ display: 'block' }} />
								</span>
								<span className={s.mode__text}>Поменять вид</span>
							</div>
						</ul>
					</div>
					<div className={s.productContainer}>
						<section className={s.main}>
							<div
								className={`${s.main__info} ${
									isVerticalMode ? s.verticalMain : ''
								}`}
							>
								<div className={isVerticalMode ? s.img__side : s.img__sideFull}>
									<div className={s.currentImg__container}>
										<Image
											className={s.currentImg}
											src={
												data.product.productImages.length
													? data.product.productImages[0]
													: '/test.jpg'
											}
											alt="phone"
											fill={true}
										/>
									</div>
									{data.product.productImages.length ? (
										<ul className={s.images}>
											<div className={s.arrow}>
												<MdOutlineArrowBackIosNew style={iconStyle} />
											</div>
											<div className={s.slider1}>
												<Swiper
													modules={[Navigation, Pagination, Scrollbar, A11y]}
													spaceBetween={10}
													slidesPerView={3}
													slideToClickedSlide={true}
													updateOnWindowResize={true}
												>
													{data.product.productImages.map(
														(image: { id: number; imageUrl: string }) => (
															<SwiperSlide key={image.id}>
																<Image
																	src="/phones/phone2.png"
																	// src={`http://localhost:4200/uploads/${image.imageUrl}`}
																	alt="image"
																	width={75}
																	height={75}
																/>
															</SwiperSlide>
														)
													)}
												</Swiper>
											</div>
											<div className={s.arrow}>
												<MdOutlineArrowForwardIos style={iconStyle} />
											</div>
										</ul>
									) : (
										<></>
									)}
								</div>
								<div className={s.info__side}>
									<div className={s.product}>
										<ul className={s.keywords}>
											<Keyword value="Бизнес" />
											<Keyword keyValue="Состояние" value="Новое" />
											<Keyword key="Доставка" value="Только оффлайн" />
											<Keyword key="Доставка" value="Только оффлайн" />
											<Keyword key="Доставка" value="Только оффлайн" />
											<Keyword key="Доставка" value="Только оффлайн" />
										</ul>
										<div className={s.description}>
											<h2 className={s.description__title}>Описание</h2>
											<p className={s.description__text}>
												{data.product.description}
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className={s.metric}>
								<div className={s.id}>ID: 7864353</div>
								<ul className={s.interactions}></ul>
								<div className={s.vote}>
									<div className={s.vote__icon}>
										<RiFlag2Line style={iconStyle} />
									</div>
									<div className={s.vote__text}>Пожаловаться</div>
								</div>
							</div>
						</section>
						<div className={s.right}>
							<div className={s.right__order}>
								<div className={s.oldPrice}>
									19 990.00 <BiRuble style={iconStyle} />
								</div>
								<div className={s.currentPrice}>
									{data.product.price}
									<span className={s.currency}>
										{data.product.currency.currency}
									</span>
									<span className={s.discount}>-7%</span>
								</div>
								<div className={s.buttons}>
									<PhoneButton phone={data.user.phone} />
									<Button text="Сообщение" />
								</div>
								<button className={s.cartButton}>
									<span className={s.cartButton__text}>Добавить в корзину</span>{' '}
									<AiOutlineShoppingCart
										style={{ display: 'block', fontSize: '20px' }}
									/>
								</button>
							</div>
							<div className={s.right__user}>
								<div className={s.status}>Пользователь</div>
								<div className={s.user}>
									<div className={s.user__avatarContainer}>
										<Image
											className={s.user__avatar}
											src={
												data.user.imageUrl
													? `http://localhost:4200/uploads/${data.user.imageUrl}`
													: '/empty-profile.png'
											}
											alt="avatar"
											width={50}
											height={50}
										/>
									</div>
									<div className={s.user__info}>
										<div className={s.user__name}>{data.user.name}</div>
										<span className={s.user__date}>
											на FINE с{' '}
											<span className={s.date}>{data.user.createdAt}</span>
										</span>
										<span className={s.user__online}>Онлайн в 12:27</span>
									</div>
								</div>
								<div className={s.deliveries}>
									<div className={s.deliveries__icon}>
										<TbTruckDelivery style={{ display: 'block' }} />
									</div>
									<div className={s.deliveries__count}>500+</div>
									<div className={s.deliveries__text}>успешных доставок</div>
								</div>
								<div className={s.rating}>
									<div className={s.rating__info}>
										<div className={s.rating__icon}>
											<GoSmiley style={iconStyle} />
										</div>
										<div className={s.rating__text}>
											<div className={s.rating__status}>Отлично</div>
											<div className={s.rating__count}>(204 оценки)</div>
										</div>
									</div>
									<div className={s.rating__title}>
										Этот автор получил много отличных отзывов
									</div>
								</div>
								<div className={s.more}>
									<div className={s.more__text}>Все объявления автора</div>
									<div className={s.more__icon}>
										<AiOutlineArrowRight style={{ display: 'block' }} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			<div className={s.rows}>
				<Row title="Все объявления автора" subtitle="Смотреть все" />
				<Row title="Похожие объявления" />
			</div>
		</div>
	)
}

export default React.memo(ProductPage)
