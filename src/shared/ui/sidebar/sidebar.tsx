'use client'
import { useState } from 'react'

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
import { useLogoutMutation } from '@/features/auth/api'
import { PATH } from '@/shared/constants'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { SidebarItem } from './sidebar-item'
import { SIDEBAR_ITEMS } from './types'
interface Props {
  onItemClick: (item: SIDEBAR_ITEMS) => void
  userId: number
}
export const Sidebar = ({ onItemClick, userId }: Props) => {
  const [activeItem, setActiveItem] = useState<SIDEBAR_ITEMS>(SIDEBAR_ITEMS.HOME)

  const [logout] = useLogoutMutation()
  const router = useRouter()

  const t = useTranslations('Sidebar')
  const handleItemClick = (item: SIDEBAR_ITEMS) => {
    setActiveItem(item)
    switch (item) {
      case SIDEBAR_ITEMS.HOME:
        onItemClick(SIDEBAR_ITEMS.HOME)
        break
      case SIDEBAR_ITEMS.CREATE:
        onItemClick(SIDEBAR_ITEMS.CREATE)
        break
      case SIDEBAR_ITEMS.MY_PROFILE:
        onItemClick(SIDEBAR_ITEMS.MY_PROFILE)
        break
      case SIDEBAR_ITEMS.MESSENGER:
        onItemClick(SIDEBAR_ITEMS.MESSENGER)
        break
      case SIDEBAR_ITEMS.SEARCH:
        onItemClick(SIDEBAR_ITEMS.SEARCH)
        break
      case SIDEBAR_ITEMS.STATISTICS:
        onItemClick(SIDEBAR_ITEMS.STATISTICS)
        break
      case SIDEBAR_ITEMS.FAVORITES:
        onItemClick(SIDEBAR_ITEMS.FAVORITES)
        break
      default:
        break
    }
  }

  const handleLogout = async () => {
    try {
      await logout().unwrap()
      localStorage.removeItem('access_token')
      router.push(PATH.SIGN_IN)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <div className={'flex flex-col pl-5 items-start h-[660px] w-[220px] border-r border-gray-700'}>
      <div className={'flex flex-col mt-[72px] space-y-6'}>
        <SidebarItem
          href={'/'}
          icon={<HomeOutline />}
          isActive={activeItem === SIDEBAR_ITEMS.HOME}
          item={t('home')}
          onClick={() => handleItemClick(SIDEBAR_ITEMS.HOME)}
        />
        <SidebarItem
          href={'/'}
          icon={<PlusSquareOutline />}
          isActive={activeItem === SIDEBAR_ITEMS.CREATE}
          item={t('create')}
          onClick={() => handleItemClick(SIDEBAR_ITEMS.CREATE)}
        />

        <SidebarItem
          href={PATH.PROFILE.replace(':id', userId.toString()) as typeof PATH.PROFILE}
          icon={<Person />}
          isActive={activeItem === SIDEBAR_ITEMS.MY_PROFILE}
          item={t('myProfile')}
          onClick={() => handleItemClick(SIDEBAR_ITEMS.MY_PROFILE)}
        />

        <SidebarItem
          href={'/'}
          icon={<MessageCircle />}
          isActive={activeItem === SIDEBAR_ITEMS.MESSENGER}
          item={t('messenger')}
          onClick={() => handleItemClick(SIDEBAR_ITEMS.MESSENGER)}
        />

        <SidebarItem
          href={'/'}
          icon={<SearchOutline />}
          isActive={activeItem === SIDEBAR_ITEMS.SEARCH}
          item={t('search')}
          onClick={() => handleItemClick(SIDEBAR_ITEMS.SEARCH)}
        />
      </div>
      <div className={'flex flex-col mt-16 space-y-6'}>
        <SidebarItem
          href={'/'}
          icon={<TrendingUpOutline />}
          isActive={activeItem === SIDEBAR_ITEMS.STATISTICS}
          item={t('statistics')}
          onClick={() => handleItemClick(SIDEBAR_ITEMS.STATISTICS)}
        />
        <SidebarItem
          href={'/'}
          icon={<BookmarkOutline />}
          isActive={activeItem === SIDEBAR_ITEMS.FAVORITES}
          item={t('favorites')}
          onClick={() => handleItemClick(SIDEBAR_ITEMS.FAVORITES)}
        />
      </div>
      <div className={'mt-auto mb-8'}>
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
