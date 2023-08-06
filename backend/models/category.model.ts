import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript'
import { Product } from './product.model'

@Table({ tableName: 'categories' })
export class Category extends Model<Category> {
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	})
	id: number

	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	slug: string

	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	en: string

	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	ua: string

	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	ru: string

	@HasMany(() => Product)
	products: []

	@Column({
		type: DataType.DATE,
		allowNull: false
	})
	createdAt: Date
	@Column({
		type: DataType.DATE,
		allowNull: false
	})
	updatedAt: Date
}
