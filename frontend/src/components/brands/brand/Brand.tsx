import Image from 'next/image'
import s from './brand.module.scss'

type Props = {
	image: string
	alt: string
}

const Brand: React.FC<Props> = ({ image, alt }) => {
	return (
		<div className={s.item}>
			<Image className={s.img} src={image} alt={alt} fill={true} />
		</div>
	)
}

export default Brand
