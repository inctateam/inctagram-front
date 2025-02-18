import { toast } from 'react-toastify'

import { usePublicPostsQuery, useTotalCountRegisteredUsersQuery } from '@/features/home-page/api'
import { ProgressBar } from '@/shared/ui'
import { PostBlock } from '@/shared/ui/post-block'
import { TotalUsersBlock } from '@/shared/ui/total-users-block'
import Image from 'next/image'

import noData from '../../../../../public/images/no-data.svg'

export const PublicPage = () => {
  const { data: dataPosts, error: errorPosts, isLoading: isLoadingPosts } = usePublicPostsQuery({})
  const {
    data: dataUsers,
    error: errorUsers,
    isLoading: isLoadingUsers,
  } = useTotalCountRegisteredUsersQuery()

  if (errorPosts) {
    toast.error('Error loading posts')
  }
  if (errorUsers) {
    toast.error('Error getting number of users')
  }

  if (isLoadingPosts || isLoadingUsers) {
    return <ProgressBar />
  }

  if (!dataPosts || !dataUsers) {
    return (
      <div className={'max-w-[972px] mx-auto flex justify-center items-center'}>
        <Image alt={'No data'} src={noData} />
      </div>
    )
  }
  const totalUsers = String(dataUsers?.totalCount).padStart(6, '0').split('').map(Number)

  return (
    <div className={'max-w-[972px] mx-auto'}>
      <TotalUsersBlock totalUsers={totalUsers} />
      <PostBlock data={dataPosts} />
    </div>
  )
}
