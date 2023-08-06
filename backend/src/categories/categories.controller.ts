import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dto/create-category.dto'

@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	@Get()
	async findAll() {
		return await this.categoriesService.findAll()
	}

	@Post()
	async create(@Body() dto: CreateCategoryDto) {
		const category = await this.categoriesService.create(dto)
		return {
			message: 'Категория добавлена',
			category
		}
	}

	@Delete(':id')
	async remove(@Param('id') id: number) {
		await this.categoriesService.remove(id)
	}
}
