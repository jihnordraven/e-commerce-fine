import {
	BadRequestException,
	UnauthorizedException,
	Injectable,
	HttpException,
	HttpStatus
} from '@nestjs/common'
import { User } from 'models/user.model'
import { UsersService } from 'src/users/users.service'
import { RegisterUserDto } from './dto/register-user.dto'
import { hash, verify } from 'argon2'
import { LoginUserDto } from './dto/login-user.dto'
import { JwtService } from '@nestjs/jwt'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private userService: UsersService
	) {}

	async register(
		dto: RegisterUserDto,
		file: Express.Multer.File
	): Promise<User | null> {
		const isUser = await this.userService.findByEmail(dto.email)
		if (isUser) {
			throw new HttpException(
				'Пользователь с таким email уже существует',
				HttpStatus.CONFLICT
			)
		}
		if (file && file.filename) {
			console.log(file.filename)
		}
		const user = new User({
			name: dto.name,
			email: dto.email,
			password: await hash(dto.password),
			age: dto.age,
			phone: dto.phone,
			country: dto.country,
			city: dto.city,
			status: dto.status ? dto.status : 'Посетитель',
			imagePath: ''
		})
		return await user.save()
	}

	async login(dto: LoginUserDto): Promise<User | null> {
		const user = await this.userService.findByEmail(dto.email)
		if (!user) {
			throw new UnauthorizedException(
				'Пользователя с таким email не существует'
			)
		}
		const isValidPassword = await verify(user.password, dto.password)
		if (!isValidPassword) {
			throw new UnauthorizedException('Неверный праоль')
		}
		return user
	}

	async update(dto: UpdateUserDto) {
		await this.userService.update(dto)
	}

	async generateTokens(user: User) {
		return {
			access: this.jwtService.sign(
				{ userId: user.id, email: user.email },
				{ expiresIn: '1h' }
			),
			refresh: this.jwtService.sign({ userId: user.id }, { expiresIn: '7d' })
		}
	}
}
