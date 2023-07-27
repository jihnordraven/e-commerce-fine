import { IsOptional, IsEmail, MinLength, MaxLength } from 'class-validator'

export class RegisterUserDto {
	@MinLength(3, { message: 'Минимальная длина имени 3 символа' })
	@MaxLength(18, { message: 'Максимальная длина имени 18 символов' })
	name: string
	@IsEmail({}, { message: 'Неккоректный тип email' })
	@MaxLength(48, { message: 'Максимальная длина email 48 символов' })
	email: string
	@MinLength(6, { message: 'Минимальная длина пароля 6 символов' })
	@MaxLength(27, { message: 'Максимальная длина пароля 27 символов' })
	password: string
	@IsOptional()
	age: number
	@IsOptional()
	country: string
	@IsOptional()
	city: string
	@IsOptional()
	phone: number
	@IsOptional()
	status: string
	@IsOptional()
	imagePath: string
}
