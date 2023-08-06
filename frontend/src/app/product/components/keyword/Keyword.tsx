import s from './keyword.module.scss'

type Props = {
	keyValue?: string
	value: string
}

const Keyword: React.FC<Props> = ({ keyValue, value }) => {
	return (
		<div className={s.keyword}>
			{keyValue && <div className={s.key}>{keyValue}:</div>}
			<div className={s.value}>{value}</div>
		</div>
	)
}

export default Keyword
