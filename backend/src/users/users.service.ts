import { Injectable, UnauthorizedException } from '@nestjs/common'
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

	async update(dto: UpdateUserDto) {
		await this.userModel.update(dto, { where: { email: dto.email } })
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
