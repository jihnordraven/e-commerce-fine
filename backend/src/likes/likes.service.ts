import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Like } from 'models/like.model'

@Injectable()
export class LikesService {
	constructor(@InjectModel(Like) private likeModel: typeof Like) {}

	async toggleLike(user_id: number, product_id: number) {
		const isLike = await this.likeModel.findOne({
			where: {
				user_id,
				product_id
			}
		})
		if (isLike) {
			isLike.destroy()
		} else {
			const like = new Like({
				user_id,
				product_id
			})
			await like.save()
		}
	}
}
