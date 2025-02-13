'use client'
import { ReactNode, useState } from 'react'

import { Sidebar } from '@/shared/ui/sidebar'
import { SIDEBAR_ITEMS } from '@/shared/ui/sidebar/types'

import { PublicUserProfile } from './public-user-profile'

interface ProfilePageProps {
  userId: number
}
export const ProfilePage = ({ userId }: ProfilePageProps) => {
  const [activeItem, setActiveItem] = useState(SIDEBAR_ITEMS.HOME)

  const handleSidebarClick = (Item: SIDEBAR_ITEMS) => {
    setActiveItem(Item)
  }

  return (
    <div className={'flex gap-6 justify-space-between max-h-[660px]'}>
      <Sidebar onItemClick={handleSidebarClick} userId={userId} />
      <div className={'flex justify-center'}>
        {activeItem === SIDEBAR_ITEMS.HOME && <div>Home page</div>}
        {activeItem === SIDEBAR_ITEMS.MY_PROFILE && <PublicUserProfile userId={userId} />}
        {activeItem === SIDEBAR_ITEMS.CREATE && <div>Create page</div>}
        {activeItem === SIDEBAR_ITEMS.MESSENGER && <div>Messenger page</div>}
        {activeItem === SIDEBAR_ITEMS.SEARCH && <div>Search page</div>}
        {activeItem === SIDEBAR_ITEMS.STATISTICS && <div>Statistics page</div>}
        {activeItem === SIDEBAR_ITEMS.FAVORITES && <div>Favorites page</div>}
      </div>
    </div>
  )
}
