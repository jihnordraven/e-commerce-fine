import Image from 'next/image'
import s from './news.module.scss'
import NewsItem from './newsItem/NewsItem'

const news = [
	{
		image: '/news/earphones.jpg',
		alt: 'earphones',
		text: 'Обзор JPL Club Pro+'
	},
	{
		image: '/news/dishes.jpg',
		alt: 'dishes',
		text: 'Обзор посуды WMF FUSIONTEC'
	},
	{
		image: '/news/skooters.jpg',
		alt: 'skooters',
		text: 'Игрушка для взрослых? Гид по выбору электросамоката'
	},
	{
		image: '/news/laptop.jpg',
		alt: 'laptop',
		text: 'Виндовс 10 станет возможным запускать на Apple M1 Mac'
	},
	{
		image: '/news/phone.jpg',
		alt: 'phone',
		text: 'Apple iPhone 12 выходит в фиолетовом цвете'
	}
]

type Props = {}

const News: React.FC<Props> = () => {
	return (
		<div className={s.container}>
			<h1 className={s.title}>Обзоры новинок</h1>
			<ul className={s.items}>
				{news.map((item: { image: string; alt: string; text: string }) => (
					<NewsItem item={item} />
				))}
			</ul>
		</div>
	)
}

export default News
