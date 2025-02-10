'use client'
import { ReactNode } from 'react'

import { Sidebar } from '@/shared/ui/sidebar'

import { UserProfile } from './user-profile'

interface ProfilePageProps {
  children?: ReactNode
  isAuth: boolean
  userId?: number
}

export const ProfilePage = ({ isAuth, userId }: ProfilePageProps) => {
  return (
    <div className={'flex gap-6 justify-space-between max-h-[660px]'}>
      {isAuth && <Sidebar />}
      <div className={'flex justify-center'}>
        <UserProfile isAuth={isAuth} userId={userId!} />
      </div>
    </div>
  )
}
