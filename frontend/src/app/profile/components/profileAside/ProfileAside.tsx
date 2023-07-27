import ProfileItem from '../profileItem/ProfileItem'
import s from './profileAside.module.scss'

const profileItems = [
	{
		id: 1,
		title: 'Главное',
		icon: '/icons/home.png',
		links: [
			{
				id: 1,
				linkIcon: '/icons/profile.png',
				text: 'Мой профиль',
				slug: 'profile',
				href: ''
			},
			{
				id: 2,
				linkIcon: '/icons/goods.png',
				text: 'Мои товары',
				slug: 'products',
				href: 'products'
			},
			{
				id: 3,
				linkIcon: '/icons/orders.png',
				text: 'Мои заказы',
				slug: 'orders',
				href: 'orders'
			},
			{
				id: 4,
				linkIcon: '/icons/message.png',
				text: 'Сообщения',
				slug: 'messages',
				href: 'messages'
			},
			{
				id: 5,
				linkIcon: '/icons/addFriend.png',
				text: 'Друзья',
				slug: 'friends',
				href: 'friends'
			},
			{
				id: 6,
				linkIcon: '/icons/notification.png',
				text: 'Уведомления',
				slug: 'notifications',
				href: 'notifications'
			},
			{
				id: 7,
				linkIcon: '/icons/cart.png',
				text: 'Корзина',
				slug: 'cart',
				href: 'cart'
			},
			{
				id: 8,
				linkIcon: '/icons/favourites2.png',
				text: 'Избранное',
				slug: 'favourites',
				href: 'favourites'
			}
		]
	},
	{
		id: 2,
		title: 'Информация',
		icon: '/icons/info.png',
		links: [
			{
				id: 1,
				linkIcon: '/icons/address.png',
				text: 'Адрес доставки',
				slug: 'address',
				href: 'address'
			},
			{
				id: 2,
				linkIcon: '/icons/communication.png',
				text: 'Контактные данные',
				slug: 'contacts',
				href: 'contacts'
			},
			{
				id: 3,
				linkIcon: '/icons/actions.png',
				text: 'Бонусы и скидки',
				slug: 'actions',
				href: 'actions'
			}
		]
	},
	{
		id: 3,
		title: 'Настройки',
		icon: '/icons/settings.png',
		links: [
			{
				id: 1,
				linkIcon: '/icons/settings.png',
				text: 'Настройки',
				slug: 'settings',
				href: 'settings'
			},
			{
				id: 2,
				linkIcon: '/icons/game.png',
				text: 'Игры',
				slug: 'games',
				href: 'games'
			},
			{
				id: 3,
				linkIcon: '/icons/exit.png',
				text: 'Выход',
				slug: 'Exit',
				href: ''
			}
		]
	}
]

type Props = {}

const ProfileAside: React.FC<Props> = () => {
	return (
		<div className={s.aside}>
			<ul className={s.items}>
				{profileItems.map((profileItem) => (
					<ProfileItem {...profileItem} />
				))}
			</ul>
		</div>
	)
}

export default ProfileAside
