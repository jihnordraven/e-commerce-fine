import { ExecutionContext, CanActivate, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class RefreshGuard implements CanActivate {
	constructor(private jwtService: JwtService) {}

	async canActivate(context: ExecutionContext) {
		const req = context.switchToHttp().getRequest()
		const token = req.headers.authorization

		if (!token) {
			return false
		}

		console.log(token)

		const refresh = token.split(' ')[1]
		try {
			const payload = await this.jwtService.verifyAsync(refresh)
			req.payload = payload
			return true
		} catch (e) {
			console.log(e)
		}

		return false
	}
}
