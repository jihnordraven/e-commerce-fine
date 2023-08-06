import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript'
import { Product } from './product.model'

@Table({ tableName: 'pay_way' })
export class PayWay extends Model<PayWay> {
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
	products: Product[]

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
