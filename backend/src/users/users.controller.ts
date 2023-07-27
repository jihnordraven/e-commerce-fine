import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	UseGuards,
	Request
} from '@nestjs/common'
import { UsersService } from './users.service'
import { JwtGuard } from 'src/auth/guards/jwt.guard'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get('profile')
	@UseGuards(JwtGuard)
	@HttpCode(HttpStatus.OK)
	async getProfile(@Request() req) {
		const { userId } = req.payload
		console.log(userId)
		const userProfile = await this.usersService.getProfile(userId)
		return {
			userProfile,
			userId
		}
	}
}
