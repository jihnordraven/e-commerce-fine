import Brand from './brand/Brand'
import s from './brands.module.scss'

const brands = [
	{ image: '/brands/google.svg', alt: 'google' },
	{ image: '/brands/facebook1.svg', alt: 'facebook' },
	{ image: '/brands/haier.svg', alt: 'haier' },
	{ image: '/brands/honor.svg', alt: 'honor' },
	{ image: '/brands/hp.svg', alt: 'hp' },
	{ image: '/brands/google.svg', alt: 'huawei' },
	{ image: '/brands/kitchenaid.svg', alt: 'kitchenaid' },
	{ image: '/brands/lg.svg', alt: 'lg' },
	{ image: '/brands/logitech.svg', alt: 'logitech' },
	{ image: '/brands/sony-logo-1.svg', alt: 'sony' },
	{ image: '/brands/hp.svg', alt: 'tefal' },
	{ image: '/brands/wwf.svg', alt: 'wwf' },
	{ image: '/brands/postgres.svg', alt: 'postgres' },
	{ image: '/brands/tesla.svg', alt: 'tesla' },
	{ image: '/brands/apple1.svg', alt: 'apple' },
	{ image: '/brands/bosch.svg', alt: 'bosch' }
]

type Props = {}

const Brands: React.FC<Props> = () => {
	return (
		<div className={s.container}>
			<h1 className={s.title}>Популярные бренды</h1>
			<div className={s.items}>
				{brands.map((brand: { image: string; alt: string }) => (
					<Brand image={brand.image} alt={brand.alt} />
				))}
			</div>
		</div>
	)
}

export default Brands
