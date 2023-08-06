import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Product } from 'models/product.model'
import { CreateProductDto } from './dto/create-product.dto'
import { ProductImage } from 'models/product-image.model'
import { IGetMyProductsArgs, IGetProductsArgs } from 'src/types'
import { Op } from 'sequelize'
import { Category } from 'models/category.model'
import { User } from 'models/user.model'
import { UsersService } from 'src/users/users.service'
import { Currency } from 'models/currency.model'
import { Like } from 'models/like.model'
import { View } from 'models/view.model'

@Injectable()
export class ProductsService {
	constructor(
		@InjectModel(Category) private categoryModel: typeof Category,
		@InjectModel(Product) private productModel: typeof Product,
		private usersService: UsersService
	) {}

	async findAll(args: IGetProductsArgs) {
		const { q = '', page = 1, limit = 16, slug = '' } = args

		let whereCondition: any = {
			name: {
				[Op.iLike]: `%${q}%`
			}
		}
		if (slug && slug !== 'all') {
			const category = await this.categoryModel.findOne({
				where: { slug }
			})
			if (category) {
				whereCondition.category_id = category.id
			} else {
				whereCondition.category_id = null
			}
		}

		const offset = limit * page - limit
		const products = await this.productModel.findAll({
			where: whereCondition,
			offset,
			limit,
			include: [
				{ model: ProductImage },
				{ model: Currency },
				{ model: Like },
				{ model: View }
			]
		})

		const totalCount = await this.productModel.count({
			where: whereCondition
		})

		return { totalCount, products }
	}

	async findMy(user_id: number, args: IGetMyProductsArgs) {
		const { page = 1, q = '', sort = '' } = args
		const limit = 16
		const user = await this.usersService.findByPk(user_id)
		if (!user) {
			throw new NotFoundException('Пользователь не найден')
		}
		const offset = limit * page - limit

		let whereCondition: any = {
			name: {
				[Op.iLike]: `%${q}%`
			},
			user_id
		}

		let order: any = [['createdAt', 'DESC']]

		const products = await this.productModel.findAll({
			where: whereCondition,
			offset,
			limit,
			order,
			include: [
				{ model: ProductImage },
				{ model: Currency },
				{ model: Like },
				{ model: View }
			]
		})

		if (!products) {
			throw new NotFoundException(`Постов по запросу ${q} не найдено`)
		}
		const totalCount = await this.productModel.count({
			where: {
				user_id
			}
		})
		const totalCountForQuery = await this.productModel.count({
			where: whereCondition
		})

		return { totalCount, totalCountForQuery, products }
	}

	async getForSlider(q: string = '', limit: number = 18) {
		const products = await this.productModel.findAll({
			where: {
				name: {
					[Op.iLike]: `%${q}`
				}
			},
			include: [
				{ model: Currency },
				{ model: ProductImage },
				{ model: Like },
				{ model: View }
			],
			limit
		})
		if (!products) {
			throw new NotFoundException('Продукты не найдены')
		}
		return products
	}

	async getProduct(product_id: number) {
		const product = await this.productModel.findOne({
			where: {
				id: product_id
			},
			include: [{ model: Currency }, { model: ProductImage }]
		})
		if (!product)
			throw new NotFoundException(`Продукт с ID: ${product_id} не найден`)
		const user = await this.usersService.getUser(product.user_id)
		return { product, user }
	}

	async create(
		userId: number,
		dto: CreateProductDto,
		email: string,
		files?: any
	) {
		console.log(dto)
		const product = new Product({
			name: dto.name,
			description: dto.description,
			price: dto.price,
			owner: email,
			user_id: userId,
			payway_id: dto.payWay_id,
			currency_id: dto.currency_id,
			category_id: dto.category_id
		})
		const createdProduct = await product.save()

		if (files) {
			const savePromises = files.map(async (file) => {
				const productImage = new ProductImage({
					imageUrl: file.filename,
					productId: createdProduct.id
				})
				await productImage.save()
			})

			await Promise.all(savePromises)
		}

		return createdProduct
	}
}
