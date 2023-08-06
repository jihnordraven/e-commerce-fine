import s from './button.module.scss'

type Props = {
	text: string
}

const Button: React.FC<Props> = ({ text }) => {
	return <button className={s.button}>{text}</button>
}

export default Button
