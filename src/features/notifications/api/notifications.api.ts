import { instagramApi } from '@/services'

import { GetNotificationsParams, GetNotificationsResponse } from '../types'

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
