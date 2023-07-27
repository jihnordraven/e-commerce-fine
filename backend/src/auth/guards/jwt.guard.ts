import {
	Injectable,
	ExecutionContext,
	CanActivate,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtGuard implements CanActivate {
	constructor(private jwtService: JwtService) {}

	async canActivate(context: ExecutionContext) {
		const req = context.switchToHttp().getRequest()
		const authHeader = req.headers.authorization

		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			throw new UnauthorizedException(
				'Токен отсутствует или имеет неверный формат'
			)
		}
		const token = authHeader.split(' ')[1]
		try {
			const payload = await this.jwtService.verifyAsync(token, {
				secret: 'secret123'
			})
			req.payload = payload
			return true
		} catch (e) {
			console.log(e)
		}
		return false
	}
}
