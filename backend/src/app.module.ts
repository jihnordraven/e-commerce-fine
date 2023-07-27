import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { DatabaseModule } from './modules/database.module'
import { UploadModule } from './modules/upload.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', '..', 'uploads'),
			serveRoot: '/uploads'
		}),
		DatabaseModule,
		UploadModule,
		AuthModule,
		UsersModule
	]
})
export class AppModule {}
