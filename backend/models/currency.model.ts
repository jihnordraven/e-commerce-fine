import { Sequelize } from 'sequelize'
import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript'
import { Product } from './product.model'

@Table({ tableName: 'currencies' })
export class Currency extends Model<Currency> {
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
	currency: string

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
