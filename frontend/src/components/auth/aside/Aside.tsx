'use client'

import Image from 'next/image'
import s from './aside.module.scss'
import Step from '../step/Step'
import { useAppSelector } from '@/hooks'

const steps = [
	{
		id: 1,
		text: 'your info'
	},
	{
		id: 2,
		text: 'select plan'
	},
	{
		id: 3,
		text: 'add-ons'
	},
	{
		id: 4,
		text: 'summary'
	}
]

interface IStep {
	id: number
	text: string
}

type Props = {}

const Aside: React.FC<Props> = () => {
	const currentStep = useAppSelector((state) => state.auth.currentStep)

	return (
		<aside className={s.aside}>
			<h1 className={s.aside__title}>Шаг {currentStep} из 4</h1>
			<ul className={s.steps}>
				{steps.map((step: IStep) => (
					<Step key={step.id} {...step} />
				))}
			</ul>
			<div className={s.oAuth}>
				<div className={s.google}>
					<Image
						className={s.google__logo}
						src="/brands/google.png"
						alt="google"
						width={30}
						height={30}
					/>
					<p className={s.google_title}>Sign in with Google</p>
				</div>
				<div className={s.facebook}>
					<Image
						className={s.facebook__logo}
						src="/brands/facebook-logo.png"
						alt="facebook"
						width={30}
						height={30}
					/>
					<p className={s.facebook__title}>Sign in with Facebook</p>
				</div>
			</div>
		</aside>
	)
}

export default Aside
