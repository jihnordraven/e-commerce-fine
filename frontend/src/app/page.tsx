'use client'

import Categories from '@/components/categories/Categories'
import s from './page.module.scss'
import Row from '@/components/row/Row'
import Table from '@/components/table/Table'
import News from '@/components/news/News'
import { RestrictedPage } from '@/utils/RestrictedPage'
import Brands from '@/components/brands/Barnds'

// const ads01 = [
// 	{ image: '/promotions/dryer.jpg', title: 'Идеальная укладка' },
// 	{ image: '/promotions/earphones.jpg', title: 'Персональные скидки' },
// 	{ image: '/promotions/glasses.jpg', title: 'Наушники для жизни' }
// ]

// const ads02 = [
// 	{ image: '/promotions/field.jpg', title: 'Не прощелкай скидку!' },
// 	{ image: '/promotions/vr.jpg', title: 'Идеальная укладка' },
// 	{ image: '/promotions/banana.jpg', title: 'Игровая переферия' }
// ]

type Props = {}

const HomePage: React.FC<Props> = () => {
	return (
		<RestrictedPage>
			<div className={s.container}>
				<Categories />
				{/* <Row title="Смартфоны и планшеты" /> */}
				{/* <Promotions items={ads01} /> */}
				<Table />
				{/* <Promotions items={ads02} /> */}
				<Row title="Смартфоны и планшеты" />
				<Row title="Ноутбуки, планшеты и компьютеры" />
				<Brands />
				<News />
			</div>
		</RestrictedPage>
	)
}

export default HomePage
