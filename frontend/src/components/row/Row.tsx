'use client'

import s from './row.module.scss'
import Card from '../card/Card'
import { LiaArrowRightSolid } from 'react-icons/lia'
import { LiaArrowLeftSolid } from 'react-icons/lia'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import 'swiper/css'
import { useGetProductsForSliderQuery } from '@/store/api/productsApi'
import { ICard } from '@/types/items'

type Props = {
	title: string
	subtitle?: string
}

const Row: React.FC<Props> = async (props) => {
	const handlePrevSlide = () => {
		if (swiper) {
			swiper.slidePrev()
		}
	}

	const handleNextSlide = () => {
		if (swiper) {
			swiper.slideNext()
		}
	}

	const currentSlide = (id: number) => {
		console.log(id)
		console.log('hello')
		// if (swiper) {
		// 	console.log(swiper.clickedIndex())
		// 	console.log(swiper.clickedSlide())
		// }
	}

	let swiper: any

	const { data: cards, isLoading } = useGetProductsForSliderQuery(1)

	return (
		<div className={s.container}>
			<div className={s.row}>
				<div className={s.name}>
					<div className={s.title}>
						<h1 className={s.title__text}>{props.title}</h1>
						<p className={s.subtitle__text}>{props.subtitle}</p>
					</div>
					<ul className={s.arrows}>
						<li className={s.arrow} onClick={handlePrevSlide}>
							<LiaArrowLeftSolid style={{ display: 'block' }} />
						</li>
						<li className={s.arrow} onClick={handleNextSlide}>
							<LiaArrowRightSolid style={{ display: 'block' }} />
						</li>
					</ul>
				</div>
				<div className={s.slider}>
					<Swiper
						modules={[Navigation, Pagination, Scrollbar, A11y]}
						spaceBetween={10}
						slidesPerGroup={6}
						slidesPerView={6}
						grabCursor={true}
						initialSlide={0}
						slideToClickedSlide={true}
						onSwiper={(s) => (swiper = s)}
						// centeredSlides={true}
						speed={1000}
					>
						{isLoading ? (
							<>loading...</>
						) : (
							<div className={s.slides}>
								{cards.map((card: ICard) => (
									<SwiperSlide>
										<Card card={card} size="sm" status="Новинка" />
									</SwiperSlide>
								))}
							</div>
						)}
					</Swiper>
				</div>
			</div>
		</div>
	)
}

export default Row
