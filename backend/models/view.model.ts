import {
	Table,
	Model,
	Column,
	DataType,
	BelongsTo,
	ForeignKey
} from 'sequelize-typescript'
import { User } from './user.model'
import { Product } from './product.model'

@Table({ tableName: 'views' })
export class View extends Model<View> {
	@ForeignKey(() => User)
	user_id: number
	@BelongsTo(() => User)
	user: User

	@ForeignKey(() => Product)
	product_id: number
	@BelongsTo(() => Product)
	product: Product
}
