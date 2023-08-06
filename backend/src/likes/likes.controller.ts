import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Request,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { LikesService } from './likes.service'
import { LikeDto } from './dto/like.dto'
import { JwtGuard } from 'src/auth/guards/jwt.guard'

@Controller('likes')
export class LikesController {
	constructor(private readonly likesService: LikesService) {}

	@Post()
	@UseGuards(JwtGuard)
	@UsePipes(new ValidationPipe())
	@HttpCode(HttpStatus.OK)
	async like(@Request() req, @Body() dto: LikeDto) {
		const { userId } = req.payload
		await this.likesService.toggleLike(userId, dto.product_id)
	}
}
