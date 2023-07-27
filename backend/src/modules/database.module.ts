import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from 'models/user.model'

@Module({
	imports: [
		SequelizeModule.forRoot({
			dialect: 'postgres',
			port: Number(process.env.DB_PORT) || 5432,
			host: process.env.DB_HOST || 'localhost',
			username: process.env.DB_USERNAME || 'postgres',
			password: process.env.DB_PASSWORD || 'qeadws',
			database: process.env.DB_DATABASE || 'database01',
			models: [User]
		})
	]
})
export class DatabaseModule {}
