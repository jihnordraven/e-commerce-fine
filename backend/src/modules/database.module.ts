import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Product } from 'models/product.model'
import { ProductImage } from 'models/product-image.model'
import { User } from 'models/user.model'
import { Category } from 'models/category.model'
import { PayWay } from 'models/payWay.model'
import { Currency } from 'models/currency.model'
import { Like } from 'models/like.model'
import { View } from 'models/view.model'

@Module({
	imports: [
		SequelizeModule.forRoot({
			dialect: 'postgres',
			port: Number(process.env.DB_PORT) || 5432,
			host: process.env.DB_HOST || 'localhost',
			username: process.env.DB_USERNAME || 'postgres',
			password: process.env.DB_PASSWORD || 'qeadws',
			database: process.env.DB_DATABASE || 'database01',
			models: [
				User,
				Product,
				ProductImage,
				Category,
				PayWay,
				Currency,
				Like,
				View
			]
		})
	]
})
export class DatabaseModule {}
