'use client'
import { toast } from 'react-toastify'

import { usePublicPostsQuery } from '@/features/home-page/api'
import { PublicPostsItems } from '@/features/home-page/types'
import { ProgressBar } from '@/shared/ui'
import Image from 'next/image'

export const PublicPage = () => {
  const { data, error, isLoading } = usePublicPostsQuery({})

  if (error) {
    return toast.error('Unauthorized')
  } else if (!data) {
    return null
  }

  return (
    <>
      {isLoading && <ProgressBar />}
      <div>
        <div>Registered users: {data.totalUsers}</div>
        <ul>
          {data.items.map((item: PublicPostsItems) => (
            <li key={item.id}>
              <Image alt={item.userName} height={192} src={item.avatarOwner} width={192} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
