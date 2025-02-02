import { ImageOutline } from '@/assets/icons/components'
import { cn } from '@/shared/utils'
import Image from 'next/image'

type Props = {
  image: string
  size: 24 | 36 | 48 | 192 | 204
}

export const Avatar = ({ image, size = 192 }: Props) => {
  const sizes = {
    24: 'size-6',
    36: 'size-9',
    48: 'size-12',
    192: 'size-48',
    204: 'w-[204px] h-[204px]',
  }

  return (
    <div
      className={cn(
        'bg-dark-500 rounded-full overflow-hidden flex justify-center items-center',
        sizes[size]
      )}
    >
      {image ? (
        <Image
          alt={'Avatar'}
          className={'object-cover w-full h-full'}
          height={size}
          src={image}
          width={size}
        />
      ) : (
        <ImageOutline className={'size-[25.25%] flex'} />
      )}
    </div>
  )
}
