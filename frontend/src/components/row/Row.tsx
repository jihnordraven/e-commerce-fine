import s from './row.module.scss'
import Card from '../card/Card'
import { LiaArrowRightSolid } from 'react-icons/lia'
import { LiaArrowLeftSolid } from 'react-icons/lia'

type Props = {
	title: string
}

const Row: React.FC<Props> = (props) => {
	return (
		<div className={s.container}>
			<div className={s.row}>
				<div className={s.title}>
					<h1 className={s.title__text}>{props.title}</h1>
					<ul className={s.arrows}>
						<li className={s.arrow}>
							<LiaArrowLeftSolid style={{ display: 'block' }} />
						</li>
						<li className={s.arrow}>
							<LiaArrowRightSolid style={{ display: 'block' }} />
						</li>
					</ul>
				</div>
				<div className={s.cards}>
					<Card image="/phones/phone1.png" status="-9%" size="sm" />
					<Card image="/phones/phone2.png" status="Новинка" size="sm" />
					<Card image="/phones/phone3.png" status="-15%" size="sm" />
					<Card image="/phones/phone1.png" status="-27%" size="sm" />
					<Card image="/phones/phone2.png" status="Новинка" size="sm" />
					<Card image="/phones/phone3.png" status="-5%" size="sm" />
				</div>
			</div>
		</div>
	)
}

export default Row
