'use client'
import { useState } from 'react'
import { toast } from 'react-toastify'

import {
  BookmarkOutline,
  HomeOutline,
  LogOutOutline,
  MessageCircle,
  Person,
  PlusSquareOutline,
  SearchOutline,
  TrendingUpOutline,
} from '@/assets/icons'
import { useLogoutMutation, useMeQuery } from '@/features/auth/api'
import { CreatePostDialog } from '@/features/post-page/ui/createPost/createPostDialog'
import { PATH } from '@/shared/constants'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { SidebarItem } from './sidebar-item'
import { SIDEBAR_ITEMS } from './types'

// interface Props {
//   activeItem: SIDEBAR_ITEMS
//   onItemClick: (item: SIDEBAR_ITEMS) => void
//   userId: number
// }

export const Sidebar = () => {
  const [logout] = useLogoutMutation()
  const { data: getMeData } = useMeQuery()
  const router = useRouter()

  const t = useTranslations('Sidebar')

  const handleLogout = async () => {
    try {
      await logout().unwrap()
      localStorage.removeItem('access_token')
      router.push(PATH.SIGN_IN)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const [activeItem, setActiveItem] = useState<SIDEBAR_ITEMS>(SIDEBAR_ITEMS.HOME)
  const [isCreatingPost, setIsCreatingPost] = useState<boolean>(false)

  const onItemClick = (item: SIDEBAR_ITEMS) => {
    setActiveItem(item)
  }

  const onPostPublished = () => {
    setIsCreatingPost(false)
    toast.success('Post has been published successfully')
    if (getMeData?.userId) {
      router.push(PATH.PROFILE.replace(':id', getMeData?.userId?.toString()))
    }
  }

  return (
    <div className={'flex flex-col pl-5 items-start w-[220px] border-r border-gray-700 '}>
      <CreatePostDialog
        onOpenChange={setIsCreatingPost}
        onPostPublished={onPostPublished}
        open={isCreatingPost}
      />
      <div className={'flex flex-col mt-[72px] space-y-6 '}>
        <SidebarItem
          href={'/'}
          icon={<HomeOutline />}
          isActive={activeItem === SIDEBAR_ITEMS.HOME}
          item={t('home')}
          onClick={() => onItemClick(SIDEBAR_ITEMS.HOME)}
        />
        <SidebarItem
          href={'/'}
          icon={<PlusSquareOutline />}
          isActive={activeItem === SIDEBAR_ITEMS.CREATE}
          item={t('create')}
          //onClick={() => onItemClick(SIDEBAR_ITEMS.CREATE)} доделать на закрытие модалки
          onClick={() => setIsCreatingPost(true)}
        />

        <SidebarItem
          href={PATH.PROFILE.replace(':id', String(getMeData?.userId))}
          icon={<Person />}
          isActive={activeItem === SIDEBAR_ITEMS.MY_PROFILE}
          item={t('myProfile')}
          onClick={() => onItemClick(SIDEBAR_ITEMS.MY_PROFILE)}
        />

        <SidebarItem
          href={'/'}
          icon={<MessageCircle />}
          isActive={activeItem === SIDEBAR_ITEMS.MESSENGER}
          item={t('messenger')}
          onClick={() => onItemClick(SIDEBAR_ITEMS.MESSENGER)}
        />

        <SidebarItem
          href={'/'}
          icon={<SearchOutline />}
          isActive={activeItem === SIDEBAR_ITEMS.SEARCH}
          item={t('search')}
          onClick={() => onItemClick(SIDEBAR_ITEMS.SEARCH)}
        />
      </div>
      <div className={'flex flex-col mt-16 space-y-6'}>
        <SidebarItem
          href={'/'}
          icon={<TrendingUpOutline />}
          isActive={activeItem === SIDEBAR_ITEMS.STATISTICS}
          item={t('statistics')}
          onClick={() => onItemClick(SIDEBAR_ITEMS.STATISTICS)}
        />
        <SidebarItem
          href={'/'}
          icon={<BookmarkOutline />}
          isActive={activeItem === SIDEBAR_ITEMS.FAVORITES}
          item={t('favorites')}
          onClick={() => onItemClick(SIDEBAR_ITEMS.FAVORITES)}
        />
      </div>
      <div className={'mt-44'}>
        <SidebarItem
          href={'/'}
          icon={<LogOutOutline />}
          isActive={activeItem === SIDEBAR_ITEMS.LOGOUT}
          item={t('logout')}
          onClick={handleLogout}
        />
      </div>
    </div>
  )
}
