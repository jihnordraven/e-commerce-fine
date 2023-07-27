import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from 'src/users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { UploadModule } from 'src/modules/upload.module'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { join } from 'path'

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
		JwtModule.register({
			global: true,
			secret: 'secret123'
		}),
		UsersModule
	],
	controllers: [AuthController],
	providers: [AuthService]
})
export class AuthModule {}
