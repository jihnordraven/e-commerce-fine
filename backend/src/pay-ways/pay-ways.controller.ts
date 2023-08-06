import { Controller, Post, Get, Body, Param, Delete } from '@nestjs/common'
import { PayWaysService } from './pay-ways.service'
import { CreatePayWayDto } from './dto/create-payWay.dto'

@Controller('pay-ways')
export class PayWaysController {
	constructor(private readonly payWaysService: PayWaysService) {}

	@Get()
	async getAllPayWays() {
		return await this.payWaysService.findAll()
	}

	@Post()
	async createPayWay(@Body() dto: CreatePayWayDto) {
		const payWay = await this.payWaysService.createPayWay(dto)
		return {
			message: 'Способ оплаты добавлен',
			payWay
		}
	}

	@Delete(':id')
	async removePayWay(@Param('id') id: number) {
		await this.payWaysService.remove(id)
		return {
			message: 'Способ оплаты удалён'
		}
	}
}
