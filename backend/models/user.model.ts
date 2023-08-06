import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript'
import { Product } from './product.model'

@Table({ tableName: 'users' })
export class User extends Model<User> {
	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	name: string
	@Column({
		type: DataType.INTEGER,
		allowNull: true
	})
	age: number
	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	email: string
	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	password: string
	@Column({
		type: DataType.STRING,
		allowNull: true
	})
	country: string
	@Column({
		type: DataType.STRING,
		allowNull: true
	})
	city: string
	@Column({
		type: DataType.NUMBER,
		allowNull: true
	})
	phone: number
	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	status: string
	@Column({
		type: DataType.STRING,
		allowNull: true
	})
	image_url: string

	@HasMany(() => Product)
	products: Product[]
}
