'use client'

import { useMeQuery } from '@/features/auth/api'
import { ProgressBar } from '@/shared/ui'

import { PublicPage } from '../public-page'

export const HomePage = () => {
  const { data, error, isLoading } = useMeQuery()

  if (error || !data) {
    return <PublicPage />
  }

  return (
    <>
      {isLoading && <ProgressBar />}
      <div>
        Олеся верстает и реализовавает эту компоненту с сайдбаром и профилем и постами
        зарегистрированного пользователя. Я работаю в PublicPage без сайдбара.
      </div>
    </>
  )
}
