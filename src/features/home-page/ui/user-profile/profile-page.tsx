'use client'
import { ReactNode } from 'react'

import { Sidebar } from '@/shared/ui/sidebar'

//import { UserProfile } from './user-profile'

interface ProfilePageProps {
  children?: ReactNode
  isAuth: boolean
  userId?: number
}
export const ProfilePage = ({ children, isAuth, userId }: ProfilePageProps) => {
  return (
    <div className={'flex gap-6 justify-space-between max-h-[660px]'}>
      {isAuth && <Sidebar userId={userId!} />}
      <div className={'flex justify-center'}>
        {children || 'Home Page'}
        {/* <UserProfile isAuth={isAuth} userId={userId!} /> */}
      </div>
    </div>
  )
}
