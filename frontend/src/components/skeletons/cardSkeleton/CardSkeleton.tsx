import s from './cardSkeleton.module.scss'

type Props = {}

const CardSkeleton: React.FC<Props> = () => {
	return (
		<div className={s.container}>
			<div className={s.img}></div>
			<div className={s.name}></div>
			<div className={s.price}>
				<div className={s.price__old}></div>
				<div className={s.price__now}></div>
			</div>
		</div>
	)
}

export default CardSkeleton
