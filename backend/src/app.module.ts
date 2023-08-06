import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { DatabaseModule } from './modules/database.module'
import { UploadModule } from './modules/upload.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { ProductsModule } from './products/products.module'
import { CategoriesModule } from './categories/categories.module'
import { PayWaysModule } from './pay-ways/pay-ways.module'
import { CurrencyModule } from './currency/currency.module'
import { LikesModule } from './likes/likes.module'
import { ViewsModule } from './views/views.module'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', '..', 'uploads'),
			serveRoot: '/uploads'
		}),
		DatabaseModule,
		UploadModule,
		AuthModule,
		UsersModule,
		ProductsModule,
		CategoriesModule,
		PayWaysModule,
		CurrencyModule,
		LikesModule,
		ViewsModule
	]
})
export class AppModule {}
