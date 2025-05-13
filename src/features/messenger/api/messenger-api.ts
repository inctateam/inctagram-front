import {
  GetLatestMessages,
  GetMessagesByUser,
  GetMessagesQueryParams,
  Message,
  MessageSendRequest,
} from '@/features/messenger/types'
import { instagramApi } from '@/services'
import socket from '@/services/socket'
import { WS_EVENTS_PATH } from '@/shared/constants/socket-events'

export const messengerApi = instagramApi.injectEndpoints({
  endpoints: builder => ({
    deleteMessage: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        method: 'DELETE',
        url: `v1/messanger/${id}`,
      }),
    }),
    getLatestMessages: builder.query<GetLatestMessages, { params: GetMessagesQueryParams }>({
      query: ({ params }) => ({
        params,
        url: `v1/messanger`,
      }),
    }),
    getMessagesByUser: builder.query<
      GetMessagesByUser,
      { dialoguePartnerId: number; meId: number; params: GetMessagesQueryParams }
    >({
      merge: (currentCache, newItems) => ({
        ...currentCache,
        items: [...currentCache.items, ...newItems.items],
      }),
      async onCacheEntryAdded(
        { dialoguePartnerId, meId },
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        await cacheDataLoaded
        const listener = (data: Message) => {
          // Проверяем, если сообщение относится к текущему диалогу
          const isRelevant =
            data.ownerId === dialoguePartnerId || data.receiverId === dialoguePartnerId

          if (!isRelevant) {
            return
          }

          // 🔔 Отправляем acknowledge, если это сообщение мне
          if (data.receiverId === meId) {
            socket.emit('acknowledge', { message: data, receiverId: meId })
          }

          updateCachedData(draft => {
            const index = draft.items.findIndex(m => m.id === data.id)

            if (index >= 0) {
              draft.items[index] = data
            } else {
              draft.items.push(data)
            }
          })
        }

        socket.on(WS_EVENTS_PATH.RECEIVE_MESSAGE, listener)

        await cacheEntryRemoved
        socket.off(WS_EVENTS_PATH.RECEIVE_MESSAGE, listener)
      },
      query: ({ dialoguePartnerId, params }) => ({
        params,
        url: `v1/messanger/${dialoguePartnerId}`,
      }),
      transformResponse: (response: GetMessagesByUser) => ({
        ...response,
        items: [...response.items].reverse(),
      }),
    }),
    sendMessage: builder.mutation<void, MessageSendRequest>({
      queryFn: async body => {
        return new Promise(resolve => {
          socket.emit(WS_EVENTS_PATH.RECEIVE_MESSAGE, body, () => {
            resolve({ data: undefined })
          })
        })
      },
    }),
    updateMessageStatus: builder.mutation<void, { ids: number[] }>({
      query: ({ ids }) => ({
        body: ids,
        method: 'PUT',
        url: `v1/messanger`,
      }),
    }),
  }),
})

export const {
  useDeleteMessageMutation,
  useGetLatestMessagesQuery,
  useGetMessagesByUserQuery,
  useSendMessageMutation,
  useUpdateMessageStatusMutation,
} = messengerApi
