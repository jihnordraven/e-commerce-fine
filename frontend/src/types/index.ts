export interface IOption {
	id: number
	name: string
	count: number
}

export interface ISortItem {
	id: number
	title: string
	options: IOption[] | null
}

export interface IProduct {
	id: number
	name: string
	description: string
	owner: string
	price: string
	user_id: number
	payway_id: number
	currency_id: number
	category_id: number
	createdAt: number
	updatedAt: number
}

export interface IUser {
	id: number
	name: string
	phone: string
	age: number | null
	country: string | null
	city: string | null
	image_url: string | null
	status: string
	email: string
	createdAt: string
	updatedAt: string
}
