import Image from 'next/image'
import s from './column.module.scss'
import { BiRuble } from 'react-icons/bi'

type Props = {
	title: string
}

const Column: React.FC<Props> = ({ title }) => {
	return (
		<div className={s.column}>
			<h2 className={s.title}>{title}</h2>
			<div className={s.items}>
				<div className={s.item}>
					<div className={s.imgContainer}>
						<Image
							className={s.image}
							src="/phones/phone1.png"
							alt="phone"
							fill={true}
						/>
					</div>
					<div className={s.textContainer}>
						<p className={s.desc}>
							Смартфон Samsung Galaxy A12 32GB Black (SM-A 125F)
						</p>
						<p className={s.price}>
							67 990 <BiRuble />
						</p>
					</div>
				</div>
				<div className={s.item}>
					<div className={s.imgContainer}>
						<Image
							className={s.image}
							src="/phones/phone1.png"
							alt="phone"
							fill={true}
						/>
					</div>
					<div className={s.textContainer}>
						<p className={s.desc}>
							Смартфон Samsung Galaxy A12 32GB Black (SM-A 125F)
						</p>
						<p className={s.price}>
							67 990 <BiRuble />
						</p>
					</div>
				</div>
				<div className={s.item}>
					<div className={s.imgContainer}>
						<Image
							className={s.image}
							src="/phones/phone1.png"
							alt="phone"
							fill={true}
						/>
					</div>
					<div className={s.textContainer}>
						<p className={s.desc}>
							Смартфон Samsung Galaxy A12 32GB Black (SM-A 125F)
						</p>
						<p className={s.price}>
							67 990 <BiRuble />
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Column
