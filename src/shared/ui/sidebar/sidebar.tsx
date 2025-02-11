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
import { PATH } from '@/shared/constants'
import { useTranslations } from 'next-intl'

import { SidebarItem } from './sidebar-item'
import { SIDEBAR_ITEMS } from './types'

interface Props {
  userId: number
}
export const Sidebar = ({ userId }: Props) => {
  const [activeItem, setActiveItem] = useState<string>('')

  console.log(activeItem)

  const t = useTranslations('Sidebar')
  const handleItemClick = (item: string) => {
    setActiveItem(item)
    console.log(item)
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
          isActive={activeItem === SIDEBAR_ITEMS.MESSANGER}
          item={t('messenger')}
          onClick={() => handleItemClick(SIDEBAR_ITEMS.MESSANGER)}
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
          onClick={() => handleItemClick(SIDEBAR_ITEMS.LOGOUT)}
        />
      </div>
    </div>
  )
}
