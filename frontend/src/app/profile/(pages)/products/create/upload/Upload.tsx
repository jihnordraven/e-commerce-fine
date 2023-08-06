import Image from 'next/image'
import s from './upload.module.scss'
import { BsUpload } from 'react-icons/bs'
import { AiOutlineDelete } from 'react-icons/ai'

type Props = {
	name: string
	image: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	handleRemoveFile: (name: string) => void
}

const Upload: React.FC<Props> = ({
	name,
	image,
	onChange,
	handleRemoveFile
}) => {
	return (
		<div className={s.upload}>
			{image ? (
				<div className={s.imgContainer}>
					<Image
						className={s.img}
						src={image}
						alt="preview"
						width={50}
						height={50}
					/>
					<div className={s.remove} onClick={() => handleRemoveFile(name)}>
						<div className={s.remove__icon}>
							<AiOutlineDelete />
						</div>
					</div>
				</div>
			) : (
				<span className={s.upload__text}>
					<BsUpload style={{ display: 'block', fontSize: '32px' }} />
				</span>
			)}
			<input
				name={name}
				className={s.upload__input}
				type="file"
				accept="image/*"
				onChange={onChange}
			/>
		</div>
	)
}

export default Upload
