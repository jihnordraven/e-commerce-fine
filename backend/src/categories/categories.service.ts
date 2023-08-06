import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Category } from 'models/category.model'
import { CreateCategoryDto } from './dto/create-category.dto'
import { Product } from 'models/product.model'

@Injectable()
export class CategoriesService {
	constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

	async findAll() {
		return await this.categoryModel.findAll()
	}

	async create(dto: CreateCategoryDto) {
		const { slug, en, ua, ru } = dto
		const isCategory = await this.categoryModel.findOne({
			where: { en, ua, ru }
		})
		if (isCategory) {
			throw new BadRequestException('Категория с таким именем уже существует')
		}
		const category = new Category({ slug, en, ua, ru })
		return await category.save()
	}

	async remove(id: number) {
		await this.categoryModel.destroy({ where: { id } })
	}
}
