import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { PayWay } from 'models/payWay.model'
import { CreatePayWayDto } from './dto/create-payWay.dto'

@Injectable()
export class PayWaysService {
	constructor(@InjectModel(PayWay) private payWayModel: typeof PayWay) {}

	async findAll() {
		return await this.payWayModel.findAll()
	}

	async findOne(dto: CreatePayWayDto) {
		const { en, ua, ru } = dto
		return await this.payWayModel.findOne({ where: { en, ua, ru } })
	}

	async findByPk(id: number) {
		return await this.payWayModel.findByPk(id)
	}

	async createPayWay(dto: CreatePayWayDto) {
		const { en, ua, ru } = dto
		const isPayWay = await this.findOne(dto)
		if (isPayWay) {
			throw new BadRequestException(
				'PayWay with this names is already existing'
			)
		}
		const payWay = new PayWay({
			en,
			ua,
			ru
		})
		return await payWay.save()
	}

	async remove(id: number) {
		const payWay = await this.findByPk(id)
		if (!payWay) {
			throw new BadRequestException(`Способа оплаты с айди ${id} не существует`)
		}
		payWay.destroy()
	}
}
