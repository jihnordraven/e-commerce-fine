import { BiRuble } from 'react-icons/bi'
import s from './tableRow.module.scss'
import { FcCancel, FcCheckmark } from 'react-icons/fc'
import CheckBox from '@/components/checkBox/CheckBox'

type Props = {
	date: string
	orderNumber: number
	isAccepted: boolean
	isPaid: boolean
	total: number
}

const TableRow: React.FC<Props> = ({
	date,
	orderNumber,
	isAccepted,
	isPaid,
	total
}) => {
	const iconStyle = { display: 'block' }

	return (
		<tr className={s.tr}>
			<td className={s.td__date}>
				<span className={s.date__text}>{date}</span>
				<CheckBox border="1px solid gray" background="white" />
			</td>
			<td className={s.td__orderNumber}>
				<span className={s.orderNumber__text}>{orderNumber}</span>
			</td>
			<td className={s.td}>
				{isAccepted ? (
					<span className={s.status}>
						<span className={s.status__text}>Принят</span>{' '}
						<FcCheckmark className={s.status__icon} style={iconStyle} />
					</span>
				) : (
					<span className={s.status}>
						<span className={s.status__text}>Отклонен</span>
						<FcCancel className={s.status__icon} style={iconStyle} />
					</span>
				)}
			</td>
			<td className={s.td}>{isPaid ? 'Оплачено' : 'Не оплачено'}</td>
			<td className={s.td}>
				{total ? (
					<div className={s.total}>
						<span className={s.total__text}>{total}</span>
						<BiRuble className={s.total__icon} style={iconStyle} />
					</div>
				) : (
					<>0</>
				)}
			</td>
		</tr>
	)
}

export default TableRow
