import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	UseGuards,
	UseInterceptors,
	Request,
	Get,
	UploadedFiles,
	Query,
	Param
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { JwtGuard } from 'src/auth/guards/jwt.guard'
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express'
import { ProductImage } from 'models/product-image.model'
import { IGetMyProductsArgs, IGetProductsArgs } from 'src/types'

@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	async getProducts(
		@Query('q') q: string,
		@Query('page') page: number,
		@Query('limit') limit: number,
		@Query('slug') slug: string
	) {
		const args: IGetProductsArgs = { q, page, limit, slug }
		const data = await this.productsService.findAll(args)
		return {
			total: data.totalCount,
			products: data.products
		}
	}

	@Get('my')
	@UseGuards(JwtGuard)
	async getMyProducts(
		@Query('page') page: number,
		@Query('q') q: string,
		@Query('sort') sort: string,
		@Request() req
	) {
		const { userId } = req.payload
		const args: IGetMyProductsArgs = { q, page, sort }
		const data = await this.productsService.findMy(userId, args)
		return {
			total: data.totalCount,
			totalCountForQuery: data.totalCountForQuery,
			products: data.products
		}
	}

	@Get('slider')
	async getForSlider(@Query('q') q: string, @Query('limit') limit: number) {
		const products = await this.productsService.getForSlider(q, limit)
		return products
	}

	@Get(':id')
	async getProduct(@Param('id') id: number) {
		const data = await this.productsService.getProduct(id)
		return {
			product: data.product,
			user: data.user
		}
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@UseGuards(JwtGuard)
	@UseInterceptors(AnyFilesInterceptor())
	async create(
		@UploadedFiles() files: Record<string, Express.Multer.File[]>,
		@Request() req,
		@Body() dto: CreateProductDto
	) {
		const { userId, email } = req.payload
		const product = await this.productsService.create(userId, dto, email, files)
		console.log(files)
		return {
			message: 'Товар успешно создан!',
			product,
			files,
			email
		}
	}
}
