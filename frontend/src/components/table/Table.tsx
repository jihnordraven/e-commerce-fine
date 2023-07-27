import Image from 'next/image'
import s from './table.module.scss'
import { BiRuble } from 'react-icons/bi'
import Column from './column/Column'

type Props = {}

const Table: React.FC<Props> = () => {
	return (
		<div className={s.container}>
			<div className={s.columns}>
				<Column title="Смартфоны и планшеты" />
				<Column title="Ноутбуки, планшеты и компьютеры" />
				<Column title="Смартфоны и планшеты" />
			</div>
		</div>
	)
}

export default Table
