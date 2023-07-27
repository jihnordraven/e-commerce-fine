import Image from 'next/image'
import s from './promotions.module.scss'
import PromotionItem from './promotionItem/PromotionItem'

type Props = {
	items: {
		image: string
		title: string
	}[]
}

const Promotions: React.FC<Props> = (props) => {
	return (
		<div className={s.container}>
			<h1 className={s.title}>Акции</h1>
			<div className={s.items}>
				{props.items.map((item: { image: string; title: string }) => (
					<PromotionItem item={item} />
				))}
			</div>
		</div>
	)
}

export default Promotions
