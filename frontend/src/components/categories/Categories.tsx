import Image from 'next/image'
import s from './categories.module.scss'

type Props = {}

const Categories: React.FC<Props> = () => {
	return (
		<div className={s.container}>
			<div className={s.items}>
				<div className={s.item}>
					<Image
						className={s.item__icon}
						src="/categories/wash-machine1.png"
						alt="laptop"
						width={220}
						height={250}
					/>
					<h2 className={s.big__text}>Бытовая техника для дома</h2>
				</div>
				<div className={s.item}>
					<Image
						className={s.item__icon}
						src="/categories/playstation.png"
						alt="playstation"
						width={100}
						height={80}
					/>
					<p className={s.item__text}>Игры и развлечения</p>
				</div>
				<div className={s.item}>
					<Image
						className={s.item__icon}
						src="/categories/laptop.png"
						alt="laptop"
						width={100}
						height={80}
					/>
					<p className={s.item__text}>Ноутбуки, планшеты и компьютеры</p>
				</div>
				<div className={s.item}>
					<Image
						className={s.item__icon}
						src="/categories/meat-grinder.png"
						alt="meat-grinder"
						width={100}
						height={80}
					/>
					<p className={s.item__text}>Техника для кухни</p>
				</div>
				<div className={s.item}>
					<Image
						className={s.item__icon}
						src="/categories/tv.png"
						alt="tv"
						width={100}
						height={80}
					/>
					<p className={s.item__text}>Телевизоры, аудио-видео, Hi-Fi</p>
				</div>
				<div className={s.item}>
					<Image
						className={s.item__icon}
						src="/categories/kids.png"
						alt="kids"
						width={100}
						height={80}
					/>

					<p className={s.item__text}>Развлечения для детей</p>
				</div>
				<div className={s.item}>
					<Image
						className={s.item__icon}
						src="/categories/camera1.png"
						alt="camera"
						width={100}
						height={80}
					/>
					<p className={s.item__text}>Фото и видеотехника</p>
				</div>
			</div>
		</div>
	)
}

export default Categories
