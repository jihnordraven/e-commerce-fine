import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	UseGuards,
	Request,
	Body,
	Post,
	Patch,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { UsersService } from './users.service'
import { JwtGuard } from 'src/auth/guards/jwt.guard'
import { UpdateUserDto } from 'src/auth/dto/update-user.dto'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get('profile')
	@UseGuards(JwtGuard)
	@HttpCode(HttpStatus.OK)
	async getProfile(@Request() req) {
		const { userId } = req.payload
		const userProfile = await this.usersService.getProfile(userId)
		return userProfile
	}

	@Patch()
	@UseGuards(JwtGuard)
	@UsePipes(new ValidationPipe())
	@HttpCode(HttpStatus.OK)
	async update(@Request() req, @Body() dto: UpdateUserDto) {
		const { userId } = req.payload
		await this.usersService.update(userId, dto)
		const user = await this.usersService.findByPk(userId)
		return {
			message: 'Данные успешно обновлены',
			user
		}
	}
}
