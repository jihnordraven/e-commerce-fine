import Image from 'next/image'
import s from './card.module.scss'
import { BiRuble } from 'react-icons/bi'
import { AiOutlineEye, AiOutlineHeart } from 'react-icons/ai'
import { LuBarChart2 } from 'react-icons/lu'
import { BsCart3 } from 'react-icons/bs'

type Props = {
	image: string
	status?: string
	size: string
	oldPrice?: number
}

const Card: React.FC<Props> = (props) => {
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

	return (
		<div className={cardStyle}>
			<div className={s.content}>
				<div className={s.imgContainer}>
					<span className={badgeStyles}>{props.status}</span>
					<Image
						className={s.card__image}
						src={props.image}
						alt="phone"
						width={props.size === 'sm' ? 100 : 125}
						height={props.size === 'sm' ? 175 : 200}
					/>
				</div>
				<div className={s.textContainer}>
					<p className={descStyle}>
						Смартфон Samsung Galaxy A12 32GB Black (SM-A125F)
					</p>
					<div className={s.price}>
						{props.oldPrice && (
							<div className={s.oldPrice}>
								<div className={s.count}>{props.oldPrice}</div>
								<div className={s.rub}>
									<BiRuble style={{ display: 'block' }} />
								</div>
							</div>
						)}
						<div className={s.currentPrice}>
							<div className={s.count}>67 990</div>
							<div className={s.rub}>
								<BiRuble style={{ display: 'block' }} />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={s.options}>
				<div className={s.options__top}>
					<div className={s.top__option}>
						<AiOutlineHeart style={{ display: 'block' }} />
					</div>
					<div className={s.top__option}>
						<LuBarChart2 style={{ display: 'block' }} />
					</div>
				</div>
				<div className={s.options__bottom}>
					<div className={s.bottom__option}>
						<BsCart3 className={s.cart} style={{ display: 'block' }} />
					</div>
					<div className={s.bottom__option}>
						<AiOutlineEye style={{ display: 'block' }} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Card
