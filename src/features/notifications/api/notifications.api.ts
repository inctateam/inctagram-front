import { instagramApi } from '@/services'
import socket from '@/services/socket'
import { WS_EVENTS_PATH } from '@/shared/constants/socket-events'

import { GetNotificationsParams, GetNotificationsResponse, WebSocketNotification } from '../types'
import { transformWebSocketNotification } from '../utils/transform-notification'

export const notificationsApi = instagramApi.injectEndpoints({
  endpoints: builder => ({
    deleteNotifications: builder.mutation<void, { id: number }>({
      invalidatesTags: ['Notifications'],
      query: ({ id }) => ({
        method: 'DELETE',
        url: `v1/notifications/${id}`,
      }),
    }),

    getNotifications: builder.query<GetNotificationsResponse, GetNotificationsParams>({
      forceRefetch: params => Boolean(params.currentArg?.cursor),
      merge: (currentCache, newItems) => ({
        ...currentCache,
        items: [...currentCache.items, ...newItems.items],
      }),
      async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
        const ws = socket

        try {
          await cacheDataLoaded
          const listener = (data: [WS_EVENTS_PATH.NOTIFICATIONS, WebSocketNotification]) => {
            if (!data || !data[1]) {
              console.error('Данные отсутствуют')

              return
            }
            const notificationData = data[1]
            const newNotification = transformWebSocketNotification(notificationData)

            updateCachedData(draft => {
              draft.items.unshift(newNotification) // Добавляем новое уведомление в начало списка
              draft.notReadCount += 1 // Увеличиваем счетчик непрочитанных уведомлений
            })
          }

          ws.on(WS_EVENTS_PATH.NOTIFICATIONS, listener)
          await cacheEntryRemoved
          ws.off(WS_EVENTS_PATH.NOTIFICATIONS, listener)
        } catch (error) {
          console.error('Ошибка при подписке на WebSocket:', error)
        }
      },
      providesTags: ['Notifications'],
      query: ({ cursor, pageSize, sortBy }) => ({
        method: 'GET',
        params: { cursor, pageSize, sortBy },
        url: `v1/notifications/${cursor || ''}`,
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return `${endpointName}}`
      },
    }),
    // Update the markNotificationsAsRead mutation
    markNotificationsAsRead: builder.mutation<void, { ids: number[] }>({
      invalidatesTags: ['Notifications'],

      query: ({ ids }) => ({
        body: { ids },
        method: 'PUT',
        url: `v1/notifications/mark-as-read`,
      }),
    }),
  }),
})

export const {
  useDeleteNotificationsMutation,
  useGetNotificationsQuery,
  useLazyGetNotificationsQuery,
  useMarkNotificationsAsReadMutation,
} = notificationsApi
