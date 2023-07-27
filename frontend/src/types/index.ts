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
