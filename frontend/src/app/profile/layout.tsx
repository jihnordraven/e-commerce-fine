'use client'

import Path from '@/components/path/Path'
import ProfileAside from './components/profileAside/ProfileAside'
import s from './layout.module.scss'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { RestrictedPage } from '@/utils/RestrictedPage'

type Props = {
	children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
	return (
		<RestrictedPage>
			<div className={s.container}>
				<div className={s.bottom}>
					<ProfileAside />
					<div className={s.children}>{children}</div>
				</div>
			</div>
		</RestrictedPage>
	)
}

export default Layout
