import {
	Table,
	Model,
	Column,
	DataType,
	ForeignKey,
	BelongsTo
} from 'sequelize-typescript'
import { Product } from './product.model'
import { Category } from './category.model'

@Table({ tableName: 'product_image' })
export class ProductImage extends Model<ProductImage> {
	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	imageUrl: string

	@ForeignKey(() => Product)
	productId: number
	@BelongsTo(() => Product)
	product: Product
}
