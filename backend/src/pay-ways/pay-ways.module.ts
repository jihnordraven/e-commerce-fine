import { Module } from '@nestjs/common'
import { PayWaysService } from './pay-ways.service'
import { PayWaysController } from './pay-ways.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { PayWay } from 'models/payWay.model'

@Module({
	imports: [SequelizeModule.forFeature([PayWay])],
	controllers: [PayWaysController],
	providers: [PayWaysService]
})
export class PayWaysModule {}
