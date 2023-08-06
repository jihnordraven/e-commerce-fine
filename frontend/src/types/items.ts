interface IProductImage {
	id: number
	imageUrl: string
	productId: number
}

interface ICurrency {
	id: number
	currency: string
}

interface ILike {
	id: number
	user_id: number
	product_id: number
}

interface IView {
	id: number
	user_id: number
	product_id: number
}

export interface ICard {
	id: number
	name: string
	description: string
	price: string
	user_id: number
	owner: string
	payway_id: number
	productImages: IProductImage[]
	currency: ICurrency
	likes: ILike[]
	views: IView[]
}

export interface ICategory {
	id: number
	slug: string
	en: string
	ua: string
	ru: string
}
