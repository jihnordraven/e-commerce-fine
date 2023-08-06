import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { View } from 'models/view.model'

@Injectable()
export class ViewsService {
	constructor(@InjectModel(View) private viewModel: typeof View) {}

	async addView(user_id: number, product_id: number) {
		console.log(user_id)
		const isViewed = await this.viewModel.findOne({
			where: {
				user_id,
				product_id
			}
		})
		if (isViewed) {
			return null
		}
		const view = new View({
			user_id,
			product_id
		})
		await view.save()
	}
}
