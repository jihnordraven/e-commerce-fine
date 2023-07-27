'use client'

import Header from '@/components/header/Header'
import './globals.scss'
import { Jost } from 'next/font/google'
import Footer from '@/components/footer/Footer'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const inter = Jost({
	subsets: ['latin'],
	weight: ['200', '300', '400', '500', '600', '700', '800', '900']
})

type Props = {
	children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Provider store={store}>
					<div className="wrapper">
						<header className="header">
							<Header />
						</header>
						<main className="main">{children}</main>
						<footer className="footer">
							<Footer />
						</footer>
					</div>
					<ToastContainer position={'top-right'} />
				</Provider>
			</body>
		</html>
	)
}

export default Layout
