import {
	Table,
	Model,
	Column,
	DataType,
	ForeignKey,
	BelongsTo,
	HasMany
} from 'sequelize-typescript'
import { User } from './user.model'
import { Category } from './category.model'
import { PayWay } from './payWay.model'
import { Currency } from './currency.model'
import { ProductImage } from './product-image.model'
import { Like } from './like.model'
import { View } from './view.model'

@Table({ tableName: 'products' })
export class Product extends Model<Product> {
	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	name: string
	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	description: string
	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	price: string
	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	owner: string

	@HasMany(() => ProductImage)
	productImages: ProductImage[]

	@HasMany(() => Like)
	likes: Like[]

	@HasMany(() => View)
	views: View[]

	@ForeignKey(() => User)
	user_id: number
	@BelongsTo(() => User)
	user: User

	@ForeignKey(() => Category)
	category_id: number
	@BelongsTo(() => Category)
	category: Category

	@ForeignKey(() => PayWay)
	payway_id: number
	@BelongsTo(() => PayWay)
	payWay: PayWay

	@ForeignKey(() => Currency)
	currency_id: number
	@BelongsTo(() => Currency)
	currency: Currency
}
