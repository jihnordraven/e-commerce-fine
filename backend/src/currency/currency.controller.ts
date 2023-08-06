import { Controller, Post, Delete, Body, Param, Get } from '@nestjs/common'
import { CurrencyService } from './currency.service'
import { CreateCurrencyDto } from './dto/create-currency.dto'

@Controller('currency')
export class CurrencyController {
	constructor(private readonly currencyService: CurrencyService) {}

	@Get()
	async getAll() {
		return await this.currencyService.findAll()
	}

	@Post()
	async createCurrency(@Body() dto: CreateCurrencyDto) {
		const currency = await this.currencyService.create(dto)
		return {
			message: 'Тип валюты добавлен',
			currency
		}
	}

	@Delete(':id')
	async remove(@Param('id') id: number) {
		await this.currencyService.remove(id)
		return {
			message: 'Тип валюты удалён'
		}
	}
}
