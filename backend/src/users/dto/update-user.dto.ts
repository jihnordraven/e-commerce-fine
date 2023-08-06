import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator'

export class UpdateUserDto {
	@IsOptional()
	@MinLength(3, { message: 'Минимальная длина имени 3 символа' })
	name: string
	@IsOptional()
	@IsNotEmpty({ message: 'Поле email является объязательным' })
	@IsEmail({}, { message: 'Неккоректный тип email' })
	email: string
	@IsOptional()
	age: string
	@IsOptional()
	country: string
	@IsOptional()
	city: string
	@IsOptional()
	status: string
}
