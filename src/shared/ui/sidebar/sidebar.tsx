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
import { authApi, useLogoutMutation, useMeQuery } from '@/features/auth/api'
import { CreatePostDialog } from '@/features/create-post/ui/createPostDialog'
import { useAppDispatch } from '@/services'
import { PATH } from '@/shared/constants'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { AlertDialog, CancelButton, ConfirmButton } from '../dialogs'
import { SidebarItem } from './sidebar-item'
import { SIDEBAR_ITEMS } from './types'

export const Sidebar = () => {
  const [logout] = useLogoutMutation()
  const { data: getMeData } = useMeQuery()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const t = useTranslations('Sidebar')

  const handleLogout = async () => {
    try {
      await logout().unwrap()
      localStorage.removeItem('access_token')
      router.push(PATH.SIGN_IN)
      // Сброс состояния
      dispatch(authApi.util.resetApiState())
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const [activeItem, setActiveItem] = useState<SIDEBAR_ITEMS>(SIDEBAR_ITEMS.HOME)
  const [isCreatingPost, setIsCreatingPost] = useState<boolean>(false)
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)

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
          icon={<HomeOutline className={'h-6 w-6'} />}
          isActive={activeItem === SIDEBAR_ITEMS.HOME}
          item={t('home')}
          onClick={() => onItemClick(SIDEBAR_ITEMS.HOME)}
        />
        <SidebarItem
          href={'/'}
          icon={<PlusSquareOutline className={'h-6 w-6'} />}
          isActive={activeItem === SIDEBAR_ITEMS.CREATE}
          item={t('create')}
          onClick={() => setIsCreatingPost(true)}
        />

        <SidebarItem
          href={PATH.PROFILE.replace(':id', String(getMeData?.userId))}
          icon={<Person className={'h-6 w-6'} />}
          isActive={activeItem === SIDEBAR_ITEMS.MY_PROFILE}
          item={t('myProfile')}
          onClick={() => onItemClick(SIDEBAR_ITEMS.MY_PROFILE)}
        />

        <SidebarItem
          href={PATH.MESSENGER}
          icon={<MessageCircle className={'h-6 w-6'} />}
          isActive={activeItem === SIDEBAR_ITEMS.MESSENGER}
          item={t('messenger')}
          onClick={() => onItemClick(SIDEBAR_ITEMS.MESSENGER)}
        />

        <SidebarItem
          href={PATH.PROFILE_SEARCH.replace(':id', String(getMeData?.userId))}
          icon={<SearchOutline className={'h-6 w-6'} />}
          isActive={activeItem === SIDEBAR_ITEMS.SEARCH}
          item={t('search')}
          onClick={() => onItemClick(SIDEBAR_ITEMS.SEARCH)}
        />
      </div>
      <div className={'flex flex-col mt-16 space-y-6'}>
        <SidebarItem
          href={'/'}
          icon={<TrendingUpOutline className={'h-6 w-6'} />}
          isActive={activeItem === SIDEBAR_ITEMS.STATISTICS}
          item={t('statistics')}
          onClick={() => onItemClick(SIDEBAR_ITEMS.STATISTICS)}
        />
        <SidebarItem
          href={'/'}
          icon={<BookmarkOutline className={'h-6 w-6'} />}
          isActive={activeItem === SIDEBAR_ITEMS.FAVORITES}
          item={t('favorites')}
          onClick={() => onItemClick(SIDEBAR_ITEMS.FAVORITES)}
        />
      </div>
      <div className={'mt-44'}>
        <SidebarItem
          href={'/'}
          icon={<LogOutOutline className={'h-6 w-6'} />}
          isActive={activeItem === SIDEBAR_ITEMS.LOGOUT}
          item={t('logout')}
          onClick={() => setIsLogoutDialogOpen(true)}
        />
      </div>
      <AlertDialog
        cancelButton={<CancelButton onClick={() => setIsLogoutDialogOpen(false)}>No</CancelButton>}
        confirmButton={<ConfirmButton onClick={handleLogout}>Yes</ConfirmButton>}
        description={
          'Are you really want to log out of your account ' + `${getMeData?.email}` + '?'
        }
        onOpenChange={setIsLogoutDialogOpen}
        open={isLogoutDialogOpen}
        title={'Log Out'}
      />
    </div>
  )
}
