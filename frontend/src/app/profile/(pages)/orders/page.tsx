import TableRow from './tableRow/TableRow'
import s from './page.module.scss'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import SortDropdown from '@/components/sortMenu/sortDropdown/sortDropdown'
import { sort } from '@/data'
import CheckBox from '@/components/checkBox/CheckBox'

type Props = {}

const Orders: React.FC<Props> = () => {
	return (
		<div className={s.container}>
			<div className={s.title}>
				<h1 className={s.title__text}>История заказов</h1>
				<div className={s.title__sort}>
					<SortDropdown sort={sort} />
				</div>
			</div>
			<table className={s.table}>
				<thead className={s.thead}>
					<tr>
						<th className={s.th__date}>
							<div className={s.date__title}>Дата регистрации</div>
							<CheckBox border="1px solid black" background="inherit" />
						</th>
						<th className={s.th}>Номер заказа</th>
						<th className={s.th}>Статус</th>
						<th className={s.th}>Оплата</th>
						<th className={s.th__last}>Номер заказа</th>
					</tr>
				</thead>
				<tbody className={s.tbody}>
					<TableRow
						date="12.08.2023 23:58"
						isAccepted={false}
						isPaid={false}
						total={1004}
						orderNumber={1100}
					/>
					<TableRow
						date="12.08.2023 23:58"
						isAccepted={false}
						isPaid={false}
						total={1004}
						orderNumber={1100}
					/>
					<TableRow
						date="12.08.2023 23:58"
						isAccepted={false}
						isPaid={false}
						total={1004}
						orderNumber={1100}
					/>
				</tbody>
			</table>
			<div className={s.pagination}>
				<div className={s.count}>1 - 10 / 115</div>
				<div className={s.arrows}>
					<div className={s.arrow}>
						<AiOutlineArrowLeft style={{ display: 'block' }} />
					</div>
					<div className={s.arrow}>
						<AiOutlineArrowRight style={{ display: 'block' }} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Orders
