import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

const start = async () => {
	const PORT = process.env.PORT || 4200
	try {
		const app = await NestFactory.create(AppModule)
		app.enableCors()
		app.setGlobalPrefix('api')
		await app.listen(PORT, () =>
			console.log(`Server is running on localhost:${PORT}`)
		)
	} catch (e) {
		console.log(e)
	}
}

start()
