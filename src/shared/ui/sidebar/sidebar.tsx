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

import { SidebarItem } from './sidebar-item'
import { SIDEBAR_ITEMS } from './types'

export const Sidebar = () => {
  const [activeItem, setActiveItem] = useState<string>('Home')

  const handleItemClick = (item: string) => {
    setActiveItem(item)
  }

  return (
    <div className={'flex flex-col pl-5 h-[660px] w-[220px] border-r border-gray-700'}>
      <div className={'flex flex-col mt-8 space-y-6'}>
        <SidebarItem
          href={'/'}
          icon={<HomeOutline />}
          isActive={activeItem === SIDEBAR_ITEMS.HOME}
          item={SIDEBAR_ITEMS.HOME}
          onClick={() => handleItemClick(SIDEBAR_ITEMS.HOME)}
        />
        <SidebarItem
          href={'/'}
          icon={<PlusSquareOutline />}
          isActive={activeItem === SIDEBAR_ITEMS.CREATE}
          item={SIDEBAR_ITEMS.CREATE}
          onClick={() => handleItemClick(SIDEBAR_ITEMS.CREATE)}
        />
        <SidebarItem
          href={'/'}
          icon={<Person />}
          isActive={activeItem === SIDEBAR_ITEMS.MY_PROFILE}
          item={SIDEBAR_ITEMS.MY_PROFILE}
          onClick={() => handleItemClick(SIDEBAR_ITEMS.MY_PROFILE)}
        />
        <SidebarItem
          href={'/'}
          icon={<MessageCircle />}
          isActive={activeItem === SIDEBAR_ITEMS.MESSANGER}
          item={SIDEBAR_ITEMS.MESSANGER}
          onClick={() => handleItemClick(SIDEBAR_ITEMS.MESSANGER)}
        />
        <SidebarItem
          href={'/'}
          icon={<SearchOutline />}
          isActive={activeItem === SIDEBAR_ITEMS.SEARCH}
          item={SIDEBAR_ITEMS.SEARCH}
          onClick={() => handleItemClick(SIDEBAR_ITEMS.SEARCH)}
        />
      </div>
      <div className={'flex flex-col mt-16 space-y-6'}>
        <SidebarItem
          href={'/'}
          icon={<TrendingUpOutline />}
          isActive={activeItem === SIDEBAR_ITEMS.STATISTICS}
          item={SIDEBAR_ITEMS.STATISTICS}
          onClick={() => handleItemClick(SIDEBAR_ITEMS.STATISTICS)}
        />
        <SidebarItem
          href={'/'}
          icon={<BookmarkOutline />}
          isActive={activeItem === SIDEBAR_ITEMS.FAVORITES}
          item={SIDEBAR_ITEMS.FAVORITES}
          onClick={() => handleItemClick(SIDEBAR_ITEMS.FAVORITES)}
        />
      </div>
      <div className={'mt-auto mb-8'}>
        <SidebarItem
          href={'/'}
          icon={<LogOutOutline />}
          isActive={activeItem === SIDEBAR_ITEMS.LOGOUT}
          item={SIDEBAR_ITEMS.LOGOUT}
          onClick={() => handleItemClick(SIDEBAR_ITEMS.LOGOUT)}
        />
      </div>
    </div>
  )
}
