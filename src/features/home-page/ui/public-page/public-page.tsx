'use client'
import { toast } from 'react-toastify'

import { usePublicPostsQuery } from '@/features/home-page/api'
import { PublicPostItem } from '@/features/home-page/types'
import { ProgressBar, Typography } from '@/shared/ui'
import { Post } from '@/shared/ui/post'

export const PublicPage = () => {
  const { data, error, isLoading } = usePublicPostsQuery({ pageSize: 4 })

  if (error) {
    return toast.error('Unauthorized')
  } else if (!data) {
    return null
  }

  const totalUsers = String(data.totalUsers).padStart(6, '0').split('').map(Number)

  return (
    <>
      {isLoading && <ProgressBar />}
      <div className={'w-full'}>
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
        <ul className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3'}>
          {data.items.map((item: PublicPostItem) => (
            <Post item={item} key={item.id} />
          ))}
        </ul>
      </div>
    </>
  )
}
