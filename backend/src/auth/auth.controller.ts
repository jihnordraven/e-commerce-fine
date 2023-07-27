import {
	Controller,
	HttpCode,
	Post,
	Body,
	HttpStatus,
	UseGuards,
	UsePipes,
	ValidationPipe,
	UseInterceptors,
	UploadedFile,
	Patch,
	Get
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterUserDto } from './dto/register-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { JwtGuard } from './guards/jwt.guard'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	@UsePipes(new ValidationPipe())
	@UseInterceptors(FileInterceptor('file'))
	async register(
		@Body() dto: RegisterUserDto,
		@UploadedFile() file: Express.Multer.File
	) {
		const user = await this.authService.register(dto, file)
		const tokens = await this.authService.generateTokens(user)
		return {
			message: 'Регистрация прошла успешно',
			user,
			access: tokens.access,
			refresh: tokens.refresh
		}
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	@UsePipes(new ValidationPipe())
	async login(@Body() dto: LoginUserDto) {
		const user = await this.authService.login(dto)
		const tokens = await this.authService.generateTokens(user)
		return {
			message: 'Авторизация прошла успешно',
			user,
			access: tokens.access,
			refresh: tokens.refresh
		}
	}

	@Patch()
	@UseGuards(JwtGuard)
	@UsePipes(new ValidationPipe())
	@HttpCode(HttpStatus.OK)
	async update(dto: UpdateUserDto) {
		await this.authService.update(dto)
		return {
			message: 'Данные успешно обновлены'
		}
	}
}
