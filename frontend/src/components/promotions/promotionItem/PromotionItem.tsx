import Image from 'next/image'
import s from './promotionItem.module.scss'

type Props = {
	item: { image: string; title: string }
}

const PromotionItem: React.FC<Props> = (props) => {
	return (
		<div className={s.item}>
			<Image
				className={s.image}
				src={props.item.image}
				alt="promotion"
				width={450}
				height={260}
			/>
			<span className={s.image__text}>{props.item.title}</span>
		</div>
	)
}

export default PromotionItem
