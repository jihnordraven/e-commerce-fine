import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Currency } from 'models/currency.model'
import { CreateCurrencyDto } from './dto/create-currency.dto'

@Injectable()
export class CurrencyService {
	constructor(@InjectModel(Currency) private currencyModel: typeof Currency) {}

	async findAll() {
		return await this.currencyModel.findAll()
	}

	async findOne(currency: string) {
		return await this.currencyModel.findOne({ where: { currency } })
	}

	async findByPk(id: number) {
		return await this.currencyModel.findByPk(id)
	}

	async create(dto: CreateCurrencyDto) {
		const isCurrency = await this.findOne(dto.currency)
		if (isCurrency) {
			throw new BadRequestException(
				'Currency with this name is already existing'
			)
		}
		const currency = new Currency({
			currency: dto.currency
		})
		return await currency.save()
	}

	async remove(id: number) {
		const currency = await this.findByPk(id)
		if (!currency) {
			throw new BadRequestException(`Тип валюты с id ${id} не существует`)
		}
		await currency.destroy()
	}
}
