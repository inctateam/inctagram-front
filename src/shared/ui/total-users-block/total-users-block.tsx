import { Typography } from '@/shared/ui'

type Props = {
  totalUsers: number[]
}

export const TotalUsersBlock = ({ totalUsers }: Props) => {
  return (
    <div
      className={
        'flex items-center justify-between w-full h-20 border border-dark-300 bg-dark-500 mb-9'
      }
    >
      <Typography className={'ml-6'} variant={'h2'}>
        Registered users:
      </Typography>
      <ul className={'flex items-center mr-6 p-2 h-12 border border-dark-300 bg-dark-700'}>
        {totalUsers.map((num, index) => (
          <li key={index}>
            <Typography
              className={`px-3 py-1 border-dark-300
                ${index < totalUsers.length - 1 && 'border-r'}`}
              variant={'h2'}
            >
              {num}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  )
}
