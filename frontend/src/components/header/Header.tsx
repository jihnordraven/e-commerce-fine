'use client'

import Link from 'next/link'
import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react'

import s from './header.module.scss'
import { BsTelephone } from 'react-icons/bs'
import { BiBarChart } from 'react-icons/bi'
import { AiOutlineHeart } from 'react-icons/ai'
import { BsCart3 } from 'react-icons/bs'
import { FaBars } from 'react-icons/fa'
import { LiaUserSolid } from 'react-icons/lia'
import { SlArrowDown } from 'react-icons/sl'
import AuthModal from '../auth/AuthModal'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { authSlice } from '@/store/slices/authSlice'
import { IoIosArrowUp, IoIosSearch } from 'react-icons/io'
import { IoIosArrowDown } from 'react-icons/io'
import { mainSlice } from '@/store/slices/mainSlice'
import Options from './options/Options'
import { useRouter, useSearchParams } from 'next/navigation'

type Props = {}

const Header: React.FC<Props> = () => {
	useEffect(() => {
		const refresh = window.localStorage.getItem('refresh')
		const access = window.localStorage.getItem('access')
		if (refresh) {
			dispatch(authSlice.actions.setIsAuth({ access, refresh }))
		}
	}, [])

	const isAuth = useAppSelector((state) => state.auth.isAuth)

	const dispatch = useAppDispatch()

	const isOpenAuthModal = useAppSelector((state) => state.auth.isOpenAuthModal)

	const openRegisterModal = () => {
		dispatch(authSlice.actions.openAuthModal())
		dispatch(authSlice.actions.onRegisterMode())
		dispatch(authSlice.actions.routeToStep(1))
		window.localStorage.setItem('registerMode', 'true')
		window.localStorage.setItem('authModalStatus', 'true')
	}

	const openLoginModal = () => {
		dispatch(authSlice.actions.openAuthModal())
		dispatch(authSlice.actions.offRegisterMode())
		window.localStorage.setItem('registerMode', 'false')
		window.localStorage.setItem('authModalStatus', 'true')
	}

	useEffect(() => {
		const authModalStatus = window.localStorage.getItem('authModalStatus')
		if (authModalStatus === 'true') {
			dispatch(authSlice.actions.openAuthModal())
		}
	}, [])

	const isHeaderShowing = useAppSelector((state) => state.main.isHeaderShowing)

	const showHeader = () => {
		dispatch(mainSlice.actions.showHeader())
	}

	const hideHeader = () => {
		dispatch(mainSlice.actions.hideHeader())
	}

	const [value, setValue] = useState('')

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}

	const router = useRouter()

	const search = useSearchParams()
	const params = new URLSearchParams(search.toString())

	const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			const trimmedValue = value.trim()
			if (trimmedValue.length >= 1 && trimmedValue !== '') {
				params.delete('page')
				params.set('q', trimmedValue)
				router.push(`?${params.toString()}`)
			} else {
				params.delete('page')
				params.delete('q')
				router.push(`?${params.toString()}`)
			}
		}
	}

	const handleIconSearch = () => {
		const trimmedValue = value.trim()
		if (trimmedValue.length >= 1 && trimmedValue !== '') {
			params.delete('page')
			params.set('q', trimmedValue)
			router.push(`?${params.toString()}`)
		} else {
			params.delete('page')
			params.delete('q')
			router.push(`?${params.toString()}`)
		}
	}

	return (
		<>
			<div className={s.container}>
				{isHeaderShowing ? (
					<span className={s.hideArrow} onClick={hideHeader}>
						<IoIosArrowUp style={{ display: 'block' }} />
					</span>
				) : (
					<span className={s.showArrow} onClick={showHeader}>
						<IoIosArrowDown style={{ display: 'block' }} />
					</span>
				)}
				{isOpenAuthModal && <AuthModal />}
				{isHeaderShowing && (
					<div className={s.infoContainer}>
						<div className={s.info}>
							<ul className={s.links}>
								<li className={s.link}>Доставка и оплата</li>
								<li className={s.link}>Пункты выдачи</li>
								<li className={s.link}>Поддержка</li>
							</ul>
							<div className={s.phone}>
								<div className={s.phone__icon}>
									<BsTelephone />
								</div>
								<span className={s.phone__number}>+380(95)-123-46-14</span>
							</div>
						</div>
					</div>
				)}
				<div className={s.headerContainer}>
					<div className={s.header}>
						<div className={s.headerTopContainer}>
							<div className={s.header__top}>
								<Link href="/" className={s.logo}>
									FINE
								</Link>
								<nav className={s.nav}>
									<div className={s.catalog}>
										<div className={s.catalog__icon}>
											<FaBars style={{ display: 'block' }} />
										</div>
										<div className={s.catalog__text}>Каталог</div>
									</div>
									<div className={s.inputContainer}>
										<input
											className={s.input}
											type="text"
											placeholder="Поиск"
											value={value}
											onChange={handleChange}
											onKeyDown={handleSearch}
										/>
										<span className={s.input__icon} onClick={handleIconSearch}>
											<IoIosSearch />
										</span>
									</div>
									{isAuth ? (
										<ul className={s.nav__items}>
											<Link href="/profile" className={s.nav__item}>
												<div className={s.item__icon}>
													<LiaUserSolid />
												</div>
												<span className={s.item__text}>Профиль</span>
											</Link>
											<li className={s.nav__item}>
												<div className={s.item__icon}>
													<BiBarChart />
												</div>
												<span className={s.item__text}>Сравнение</span>
											</li>
											<li className={s.nav__item}>
												<div className={s.item__icon}>
													<AiOutlineHeart />
													<span className={s.icon__count}>1</span>
												</div>
												<div className={s.item__text}>Избранное</div>
											</li>
											<Link href="/profile/cart" className={s.nav__item}>
												<div className={s.item__icon}>
													<BsCart3 />
												</div>
												<div className={s.item__text}>Корзина</div>
											</Link>
										</ul>
									) : (
										<div className={s.nav__auth}>
											<div
												className={s.nav__auth__item}
												onClick={openLoginModal}
											>
												Войти
											</div>
											<div
												className={s.nav__auth__item}
												onClick={openRegisterModal}
											>
												Создать аккаунт
											</div>
										</div>
									)}
								</nav>
							</div>
						</div>
						<Options />
					</div>
				</div>
			</div>
		</>
	)
}

export default Header
