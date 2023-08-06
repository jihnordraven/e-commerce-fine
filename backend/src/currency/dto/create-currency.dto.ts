import { IsNotEmpty } from 'class-validator'

export class CreateCurrencyDto {
	@IsNotEmpty({ message: 'Это поле является объязательным' })
	currency: string
}
