import SortDropdown from '@/components/sortMenu/sortDropdown/sortDropdown'
import { sort } from '@/data'
import s from './page.module.scss'
import Card from '@/components/card/Card'

type Props = {}

const Products: React.FC<Props> = () => {
	return (
		<div className={s.container}>
			<div className={s.filters}>
				<input className={s.input} type="text" placeholder="Поиск" />
				<p className={s.all}>
					Всего (<span className={s.all__count}>37</span>)
				</p>
				<div className={s.sort}>
					<SortDropdown sort={sort} />
				</div>
			</div>
			<div className={s.main}>
				<div className={s.items}>
					<Card
						image="/phones/phone1.png"
						size="sm"
						status="Новинка"
						oldPrice={79000}
					/>
					<Card
						image="/phones/phone2.png"
						size="sm"
						status="Новинка"
						oldPrice={79000}
					/>
					<Card
						image="/phones/phone3.png"
						size="sm"
						status="Новинка"
						oldPrice={79000}
					/>
					<Card
						image="/phones/phone1.png"
						size="sm"
						status="Новинка"
						oldPrice={79000}
					/>
					<Card
						image="/phones/phone2.png"
						size="sm"
						status="Новинка"
						oldPrice={79000}
					/>
					<Card
						image="/phones/phone3.png"
						size="sm"
						status="Новинка"
						oldPrice={79000}
					/>
					<Card
						image="/phones/phone1.png"
						size="sm"
						status="Новинка"
						oldPrice={79000}
					/>
					<Card
						image="/phones/phone2.png"
						size="sm"
						status="Новинка"
						oldPrice={79000}
					/>
					<Card
						image="/phones/phone3.png"
						size="sm"
						status="Новинка"
						oldPrice={79000}
					/>
				</div>
				<div className={s.menu}>menu</div>
			</div>
		</div>
	)
}

export default Products
