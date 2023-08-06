import s from './action.module.scss'

type Props = {
	icon: React.ReactNode
	text: string
}

const Action: React.FC<Props> = ({ icon, text }) => {
	return (
		<div className={s.action}>
			<div className={s.icon}>{icon}</div>
			<div className={s.text}>{text}</div>
		</div>
	)
}

export default Action
