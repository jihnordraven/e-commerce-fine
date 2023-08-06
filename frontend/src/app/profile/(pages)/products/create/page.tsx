'use client'

import React, { ChangeEvent, useState } from 'react'
import { AiOutlineRollback } from 'react-icons/ai'
import s from './page.module.scss'
import CurrencyDropdown from './currencyDropdown/CurrencyDropdown'
import Upload from './upload/Upload'
import { useCreateProductMutation } from '@/store/api/productsApi'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useGetAllCategoriesQuery } from '@/store/api/categoriesApi'
import { useGetAllPayWaysQuery } from '@/store/api/payWaysApi'
import { useGetAllCurrenciesQuery } from '@/store/api/currencyApi'
import { RiNumbersLine } from 'react-icons/ri'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], weight: '400' })

import Dropdown from './dropdown/Dropdown'

type Props = {}

const Create: React.FC<Props> = () => {
	const {
		data: categories,
		isLoading: isCategoriesLoading,
		error: isCategoriesError
	} = useGetAllCategoriesQuery(1)
	const {
		data: payWays,
		isLoading: isPayWaysLoading,
		error: isPayWaysError
	} = useGetAllPayWaysQuery(1)

	const {
		data: currencies,
		isLoading: isCurrenciesLoading,
		error: isCurrenciesError
	} = useGetAllCurrenciesQuery(1)

	const initialFormData: any = {
		name: '',
		price: '',
		description: '',
		subCategory: '',
		images: []
	}

	interface IFormData {
		name: string
		price: string
		description: string
		subCategory: string
		images: any[]
		category_id: number | null
		payway_id: number | null
		currency_id: number | null
	}

	const [formData, setFormData] = useState<IFormData>({
		name: '',
		price: '',
		description: '',
		subCategory: '',
		images: [],
		category_id: null,
		payway_id: null,
		currency_id: 3
	})

	const [isNameEmpty, setIsNameEmpty] = useState(false)
	const [isCategoryEmpty, setIsCategoryEmpty] = useState(false)
	const [isPriceEmpty, setIsPriceEmpty] = useState(false)
	const [isCurrencyEmpty, setIsCurrencyEmpty] = useState(false)
	const [isDescriptionEmpty, setIsDescriptionEmpty] = useState(false)
	const [isPayWayEmpty, setIsPayWayEmpty] = useState(false)

	const [createProduct] = useCreateProductMutation()

	const router = useRouter()

	// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault()
	// 	console.log(formData)
	// }

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// setIsNameEmpty(formData.name.length < 3)
		// setIsCategoryEmpty(formData.category === '')
		// setIsPriceEmpty(formData.price === '')
		// setIsCurrencyEmpty(formData.currency === '')
		// setIsDescriptionEmpty(formData.description.length < 8)
		// setIsPayWayEmpty(formData.payWay === '')
		if (
			!isNameEmpty &&
			!isCategoryEmpty &&
			!isPriceEmpty &&
			!isCurrencyEmpty &&
			!isDescriptionEmpty &&
			!isPayWayEmpty
		) {
			try {
				const access = window.localStorage.getItem('access') || ''
				const res: any = await createProduct({ formData, access })
				if (res.data) {
					toast.success(res.data.message)
					router.push('/profile/products')
					resetFormData()
				}
				console.log(res)
				if (res.error && res.error.data.statusCode === 403) {
					const refresh = window.localStorage.getItem('refresh')
					const res = await fetch('http://localhost:4200/api/auth/refresh', {
						method: 'POST',
						headers: {
							Authorization: `Bearer ${refresh}`
						}
					})
					const data = await res.json()
					window.localStorage.setItem('access', data.access)
					window.localStorage.setItem('refresh', data.refresh)
				}
			} catch (e) {
				console.log(e)
			}
		}
	}

	const [image1, setImage1] = useState<null | string>(null)
	const [image2, setImage2] = useState<null | string>(null)
	const [image3, setImage3] = useState<null | string>(null)
	const [image4, setImage4] = useState<null | string>(null)
	const [image5, setImage5] = useState<null | string>(null)
	const [image6, setImage6] = useState<null | string>(null)

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value
		})
	}

	const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value
		})
	}

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null
		const { name } = e.target
		if (file) {
			const reader = new FileReader()
			reader.onload = (e: ProgressEvent<FileReader>) => {
				const dataURL = e.target?.result as string
				switch (name) {
					case '1':
						setImage1(dataURL)
						setFormData({
							...formData,
							//@ts-ignore
							images: { ...formData.images, ['1']: file }
						})
						break
					case '2':
						setImage2(dataURL)
						setFormData({
							...formData,
							//@ts-ignore
							images: { ...formData.images, ['2']: file }
						})
						break
					case '3':
						setImage3(dataURL)
						setFormData({
							...formData,
							//@ts-ignore
							images: { ...formData.images, ['3']: file }
						})
						break
					case '4':
						setImage4(dataURL)
						setFormData({
							...formData,
							//@ts-ignore
							images: { ...formData.images, ['4']: file }
						})
						break
					case '5':
						setImage5(dataURL)
						setFormData({
							...formData,
							//@ts-ignore
							images: { ...formData.images, ['5']: file }
						})
						break
					case '6':
						setImage6(dataURL)
						setFormData({
							...formData,
							//@ts-ignore
							images: { ...formData.images, ['6']: file }
						})
						break
					default:
						break
				}
			}
			reader.readAsDataURL(file)
		}
		// if (file) {
		// 	const reader = new FileReader()
		// 	reader.onload = (e: any) => {
		// 		switch (name) {
		// 			case '1':
		// 				setImage1(e.target.result)
		// 				setFormData((prevFormData: any) => ({
		// 					...prevFormData,
		// 					images: file
		// 				}))
		// 				break
		// 			case '2':
		// 				setImage2(e.target.result)
		// 				setFormData((prevFormData: any) => ({
		// 					...prevFormData,
		// 					images: file
		// 				}))
		// 				break
		// 			case '3':
		// 				setImage3(e.target.result)
		// 				setFormData((prevFormData: any) => ({
		// 					...prevFormData,
		// 					images: { ...prevFormData.images, ['1']: file }
		// 				}))
		// 				break
		// 			case '4':
		// 				setImage4(e.target.result)
		// 				setFormData((prevFormData: any) => ({
		// 					...prevFormData,
		// 					images: { ...prevFormData.images, ['1']: file }
		// 				}))
		// 				break
		// 			case '5':
		// 				setImage5(e.target.result)
		// 				setFormData((prevFormData: any) => ({
		// 					...prevFormData,
		// 					images: { ...prevFormData.images, ['1']: file }
		// 				}))
		// 				break
		// 			case '6':
		// 				setImage6(e.target.result)
		// 				setFormData((prevFormData: any) => ({
		// 					...prevFormData,
		// 					images: { ...prevFormData.images, ['1']: file }
		// 				}))
		// 				break
		// 		}
		// 	}
		// 	reader.readAsDataURL(file)
		// }
	}

	const handleRemoveFile = (name: string) => {
		switch (name) {
			case '1':
				setImage1(null)
				break
			case '2':
				setImage2(null)
				break
			case '3':
				setImage3(null)
				break
			case '4':
				setImage4(null)
				break
			case '5':
				setImage5(null)
				break
			case '6':
				setImage6(null)
				break
		}
	}

	const resetFormData = () => {
		setFormData(initialFormData)
	}

	const [categoryValue, setCategoryValue] = useState<string | null>(null)
	const [payWayValue, setPayWayValue] = useState<string | null>(null)

	const handleChangeCategory = (name: string, id: number, preview: string) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: id
		}))

		switch (name) {
			case 'category_id':
				setCategoryValue(preview)
				break
			case 'payWay_id':
				setPayWayValue(preview)
				break
		}
	}

	const [currencyValue, setCurrencyValue] = useState<string>('USD')

	const handleChooseCurrency = (currency_id: number, value: string) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			currency_id
		}))
		setCurrencyValue(value)
	}

	return (
		<div className={s.container}>
			<div className={s.back}>
				<span className={s.back__text} onClick={() => router.back()}>
					Обратно
				</span>{' '}
				<span className={s.back__icon}>
					<AiOutlineRollback style={{ display: 'block' }} />
				</span>
			</div>
			<div className={s.content}>
				<form className={s.form} onSubmit={handleSubmit}>
					<input
						className={`${s.input} ${isNameEmpty ? s.error : ''}`}
						id="name"
						name="name"
						placeholder="Название товара"
						value={formData.name}
						onChange={handleInputChange}
					/>
					<div className={s.categories}>
						<Dropdown
							name="Категория"
							formDataName="category_id"
							items={categories && categories}
							handleChangeCategory={handleChangeCategory}
							isLabel
							value={categoryValue}
						/>
						<Dropdown
							name="Подкатегория"
							formDataName="test_id"
							items={categories && categories}
							handleChangeCategory={handleChangeCategory}
							value={'test'}
							isLabel
							isTest
						/>
					</div>
					<div className={s.price}>
						<div className={s.price__inputContainer}>
							<span className={s.price__inputLabel}>Стоимость: </span>
							<input
								className={`${s.price__input} ${isPriceEmpty ? s.error : ''}`}
								name="price"
								type="number"
								value={formData.price ? formData.price : '-'}
								onChange={handleInputChange}
							/>
							<CurrencyDropdown
								items={currencies}
								handleChooseCurrency={handleChooseCurrency}
								value={currencyValue}
							/>
							<span className={s.required}>*</span>
						</div>
						<Dropdown
							name="Оплата"
							formDataName="payWay_id"
							items={payWays && payWays}
							handleChangeCategory={handleChangeCategory}
							value={payWayValue}
						/>
					</div>
					<div className={inter.className}>
						<textarea
							className={`${s.textarea} ${isDescriptionEmpty ? s.error : ''}`}
							name="description"
							placeholder="Описание товара (максимум 200 символов)"
							value={formData.description}
							onChange={handleTextAreaChange}
						/>
					</div>
					<div className={s.buttons}>
						<button className={s.button}>Отменить</button>
						<button className={s.button} type="submit">
							Сохранить
						</button>
					</div>
				</form>
				<div className={s.uploads}>
					<Upload
						name="1"
						image={image1 ? image1 : ''}
						onChange={handleFileChange}
						handleRemoveFile={handleRemoveFile}
					/>
					{image1 && (
						<Upload
							name="2"
							image={image2 ? image2 : ''}
							onChange={handleFileChange}
							handleRemoveFile={handleRemoveFile}
						/>
					)}
					{image1 && image2 && (
						<Upload
							name="3"
							image={image3 ? image3 : ''}
							onChange={handleFileChange}
							handleRemoveFile={handleRemoveFile}
						/>
					)}
					{image1 && image2 && image3 && (
						<Upload
							name="4"
							image={image4 ? image4 : ''}
							onChange={handleFileChange}
							handleRemoveFile={handleRemoveFile}
						/>
					)}
					{image1 && image2 && image3 && image4 && (
						<Upload
							name="5"
							image={image5 ? image5 : ''}
							onChange={handleFileChange}
							handleRemoveFile={handleRemoveFile}
						/>
					)}

					{image1 && image2 && image3 && image4 && image5 && (
						<Upload
							name="6"
							image={image6 ? image6 : ''}
							onChange={handleFileChange}
							handleRemoveFile={handleRemoveFile}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export default Create
