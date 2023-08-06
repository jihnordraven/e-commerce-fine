import {
	Injectable,
	UnauthorizedException,
	BadRequestException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from 'models/user.model'
import { UpdateUserDto } from 'src/auth/dto/update-user.dto'

@Injectable()
export class UsersService {
	constructor(@InjectModel(User) private userModel: typeof User) {}

	async findByEmail(email: string): Promise<User | null> {
		return await this.userModel.findOne({ where: { email } })
	}

	async findByPk(userId: number) {
		return await this.userModel.findByPk(userId)
	}

	async getUser(user_id: number) {
		console.log(user_id)
		const user = await this.userModel.findOne({
			where: {
				id: user_id
			},
			attributes: { exclude: ['password'] }
		})
		return user
	}

	async update(user_id: number, dto: UpdateUserDto) {
		let isUser: User | null
		if (dto.email) {
			const user = await this.findByEmail(dto.email)
			isUser = user
		}
		if (isUser && isUser.email !== dto.email) {
			throw new BadRequestException('Этот email уже занят')
		}

		await this.userModel.update(dto, {
			where: {
				id: user_id
			}
		})
	}

	async getProfile(userId: number) {
		const foundUser = await this.findByPk(userId)
		if (!foundUser) {
			throw new UnauthorizedException('Вы не авторизовались')
		}
		const userProfile = foundUser.get()
		delete userProfile.password
		return userProfile
	}
}
