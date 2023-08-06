import { Controller, Post, Request, UseGuards, Body } from '@nestjs/common'
import { ViewsService } from './views.service'
import { JwtGuard } from 'src/auth/guards/jwt.guard'
import { AddViewDto } from './dto/add-view.dto'

@Controller('views')
export class ViewsController {
	constructor(private readonly viewsService: ViewsService) {}

	@Post()
	@UseGuards(JwtGuard)
	async addView(@Request() req, @Body() dto: AddViewDto) {
		const { userId } = req.payload
		await this.viewsService.addView(userId, dto.product_id)
	}
}
