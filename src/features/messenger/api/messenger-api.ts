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
      { dialoguePartnerId: number; params: GetMessagesQueryParams }
    >({
      merge: (currentCache, newItems) => ({
        ...currentCache,
        items: [...currentCache.items, ...newItems.items],
      }),
      async onCacheEntryAdded(
        { dialoguePartnerId },
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        await cacheDataLoaded
        const listener = (data: Message) => {
          if (data.ownerId === dialoguePartnerId || data.receiverId === dialoguePartnerId) {
            updateCachedData(draft => {
              draft.items.push(data) // или push — зависит от порядка
            })
          }
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
