import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'

@Module({
	imports: [
		MulterModule.register({
			storage: diskStorage({
				filename: (req, file, cb) => {
					const uniqueSuffix = `${Date.now()}-${Math.ceil(Math.random() * 9)}`
					const fileExtension = file.originalname.split('.').pop()
					cb(null, `${uniqueSuffix}-${fileExtension}`)
				}
			})
		})
	]
})
export class UploadModule {}
