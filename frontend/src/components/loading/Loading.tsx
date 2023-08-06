import s from './loading.module.scss'
import Image from 'next/image'

export const LoadingComponent = () => {
	return (
		<div className={s.loading}>
			<Image src="/main-loading.gif" alt="loading" width={50} height={50} />
		</div>
	)
}
