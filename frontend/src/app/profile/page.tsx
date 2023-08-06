import s from './page.module.scss'
import Menu from './components/menu/Menu'
import Edit from './components/edit/Edit'

type Props = {}

const Profile: React.FC<Props> = () => {
	return (
		<div className={s.profile}>
			<Edit />
		</div>
	)
}

export default Profile
