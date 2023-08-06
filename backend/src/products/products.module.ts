import { Module } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Product } from 'models/product.model'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { Category } from 'models/category.model'
import { User } from 'models/user.model'
import { UsersModule } from 'src/users/users.module'

@Module({
	imports: [
		MulterModule.register({
			storage: diskStorage({
				destination: './uploads',
				filename: (req, file, cb) => {
					const uniqueSuffix = `${Date.now()}-${Math.ceil(Math.random() * 9)}`
					cb(null, `${uniqueSuffix}-${file.originalname}`)
				}
			})
		}),
		SequelizeModule.forFeature([Product, Category]),
		UsersModule
	],
	controllers: [ProductsController],
	providers: [ProductsService]
})
export class ProductsModule {}
