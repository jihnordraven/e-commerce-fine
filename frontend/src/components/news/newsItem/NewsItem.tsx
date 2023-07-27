import Image from 'next/image'
import s from './newsItem.module.scss'

type Props = {
	item: { image: string; alt: string; text: string }
}

const NewsItem: React.FC<Props> = ({ item }) => {
	return (
		<li className={s.item}>
			<div className={s.imgContainer}>
				<Image className={s.img} src={item.image} alt={item.alt} fill={true} />
			</div>
			<div className={s.title}>{item.text}</div>
		</li>
	)
}

export default NewsItem
