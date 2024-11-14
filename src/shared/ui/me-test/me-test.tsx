'use strict'
import { useMeQuery } from '@/services/api/auth/auth.api'
import { ResponseMe } from '@/services/api/auth/auth.types'

export const MeTest = () => {
  const { data, error, isLoading } = useMeQuery()

  if (isLoading) {
    return (
      <div
        className={'text-emerald-400 mx-auto w-full xl:px-[60px] px-4 sm:pt-6 pt-4 max-w-[1280px]'}
      >
        Загрузка...
      </div>
    )
  }
  if (error) {
    return (
      <div
        className={'text-danger-100 mx-auto w-full xl:px-[60px] px-4 sm:pt-6 pt-4 max-w-[1280px]'}
      >
        Произошла ошибка
      </div>
    )
  }
  const user: ResponseMe | null = data ?? null

  return (
    <div className={'text-amber-600 mx-auto w-full xl:px-[60px] px-4 sm:pt-6 pt-4 max-w-[1280px]'}>
      {user ? (
        <div>
          <h2>Добро пожаловать, {user.username}!</h2>
          <p>Email: {user.email}</p>
          <p>User ID: {user.userId}</p>
        </div>
      ) : (
        <div>Пользователь не найден</div>
      )}
    </div>
  )
}
