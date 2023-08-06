import { AiOutlineStar } from 'react-icons/ai'
import s from './rate.module.scss'

type Props = {}

const Rate: React.FC<Props> = () => {
	return (
		<div className={s.rate}>
			<ul className={s.stars}>
				{Array.from({ length: 5 }).map((star) => (
					<li className={s.star}>
						<AiOutlineStar style={{ display: 'block' }} />
					</li>
				))}
			</ul>
			<div className={s.count}>(0)</div>
		</div>
	)
}

export default Rate
