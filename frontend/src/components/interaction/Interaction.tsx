import s from './interaction.module.scss'

type Props = {
	icon: React.ReactNode
	count: number
	onClick: (product_id: number) => void
	product_id: number
}

const Interaction: React.FC<Props> = ({ icon, count, onClick, product_id }) => {
	return (
		<li className={s.interaction} onClick={() => onClick(product_id)}>
			<div className={s.icon}>{icon}</div>
			<div className={s.count}>{count > 999 ? <>999+</> : count}</div>
		</li>
	)
}

export default Interaction
