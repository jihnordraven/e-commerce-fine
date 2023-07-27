import s from './footer.module.scss'
import { PiTelegramLogoLight } from 'react-icons/pi'
import { SlSocialVkontakte } from 'react-icons/sl'
import { SlSocialYoutube } from 'react-icons/sl'
import { FaOdnoklassniki } from 'react-icons/fa'
import Image from 'next/image'

type Props = {}

const Footer: React.FC<Props> = () => {
	return (
		<div className={s.container}>
			<div className={s.contentContainer}>
				<div className={s.content}>
					<div className={s.about}>
						<h1 className={s.logo}>FINE</h1>
						<div className={s.phones}>
							<div className={s.phones__item}>
								<h2 className={s.phone__number}>+7(800) 800-80-80</h2>
								<p className={s.phone__desc}>справочная служба</p>
							</div>
							<div className={s.phones__item}>
								<h2 className={s.phone__number}>+7(800) 800-80-80</h2>
								<p className={s.phone__desc}>интернет магазин</p>
							</div>
						</div>
						<div className={s.social}>
							<h6 className={s.social__title}>Оставайтесь на связи</h6>
							<ul className={s.social__icons}>
								<li className={s.social__icon}>
									<PiTelegramLogoLight style={{ display: 'block' }} />
								</li>
								<li className={s.social__icon}>
									<FaOdnoklassniki style={{ display: 'block' }} />
								</li>
								<li className={s.social__icon}>
									<SlSocialYoutube style={{ display: 'block' }} />
								</li>
								<li className={s.social__icon}>
									<SlSocialVkontakte style={{ display: 'block' }} />
								</li>
							</ul>
						</div>
					</div>
					<div className={s.columns}>
						<div className={s.column}>
							<h3 className={s.column__title}>О магазине</h3>
							<ul className={s.column__items}>
								<li className={s.column__item}>Условия обмена и возврата</li>
								<li className={s.column__item}>Каталог</li>
								<li className={s.column__item}>О компании</li>
								<li className={s.column__item}>Контакты</li>
								<li className={s.column__item}>Доставка</li>
								<li className={s.column__item}>Оплата</li>
							</ul>
						</div>
						<div className={s.column}>
							<h3 className={s.column__title}>Клиентам</h3>
							<ul className={s.column__items}>
								<li className={s.column__item}>Личный кабинет</li>
								<li className={s.column__item}>Блог</li>
								<li className={s.column__item}>Обратная связь</li>
							</ul>
						</div>
						<div className={s.column}>
							<h3 className={s.column__title}>Информация</h3>
							<ul className={s.column__items}>
								<li className={s.column__item}>Пользовательское соглашение</li>
								<li className={s.column__item}>
									Политика конфиденциальности оферта
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div className={s.infoContainer}>
				<div className={s.info}>
					<div className={s.info__title}>
						© 2020 Любое использование контента без письменного разрешения
						запрещено
					</div>
					<div className={s.info__desc}>Интернет-магазин создан на inSales</div>
					<div className={s.info__icons}>
						<Image
							className={s.icon}
							src="/masterCard.png"
							alt="masterCard"
							width={60}
							height={60}
						/>
						<Image
							className={s.icon}
							src="/visa.png"
							alt="visa"
							width={60}
							height={60}
						/>
						<Image
							className={s.icon}
							src="/paypal.png"
							alt="mir"
							width={60}
							height={60}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Footer
