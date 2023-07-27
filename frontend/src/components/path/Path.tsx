import Link from 'next/link'
import s from './path.module.scss'
import { TbSlash } from 'react-icons/tb'

type Props = {
	pathItem: string
	pathItem2?: string
	pathItem3?: string
	pathItem4?: string
}

const Path: React.FC<Props> = (props) => {
	return (
		<div className={s.container}>
			<Link href="/" className={s.main}>
				Главная
			</Link>
			<TbSlash />
			<div className={s.path__item}>{props.pathItem}</div>
			{props.pathItem2 && (
				<>
					<TbSlash /> <div className={s.path__item}>{props.pathItem2}</div>
				</>
			)}
			{props.pathItem3 && (
				<>
					<TbSlash /> <div className={s.path__item}>{props.pathItem3}</div>
				</>
			)}
		</div>
	)
}

export default Path
