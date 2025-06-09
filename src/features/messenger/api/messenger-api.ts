import {
  GetLatestMessages,
  GetMessagesByUser,
  GetMessagesQueryParams,
  Message,
  MessageSendRequest,
  MessageUpdateRequest,
} from '@/features/messenger/types'
import { instagramApi } from '@/services'
import socket from '@/services/socket'
import { WS_EVENTS_PATH } from '@/shared/constants/socket-events'

const messengerApi = instagramApi.injectEndpoints({
  endpoints: builder => ({
    deleteMessageById: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        method: 'DELETE',
        url: `v1/messenger/${id}`,
      }),
    }),
    getLatestMessages: builder.query<GetLatestMessages, { params: GetMessagesQueryParams }>({
      query: ({ params }) => ({
        params,
        url: `v1/messenger`,
      }),
    }),
    getMessagesByUser: builder.query<
      GetMessagesByUser,
      { dialoguePartnerId: number; meId: number; params: GetMessagesQueryParams }
    >({
      forceRefetch: params => Boolean(params.currentArg?.params?.cursor),
      merge: (currentCache, newItems) => {
        const existingIds = new Set(currentCache.items.map(item => item.id))
        const filteredNewItems = newItems.items.filter(item => !existingIds.has(item.id))

        return {
          ...currentCache,
          items: [...filteredNewItems, ...currentCache.items],
        }
      },
      async onCacheEntryAdded(
        { dialoguePartnerId, meId },
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        await cacheDataLoaded
        // 🔵 Слушаем RECEIVE_MESSAGE для отправителя (обновление сообщений)
        const handleReceiveMessage = (data: Message) => {
          const isRelevant =
            data.ownerId === dialoguePartnerId || data.receiverId === dialoguePartnerId

          if (!isRelevant) {
            return
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

        const updateMessageHandler = (data: Message) => {
          updateCachedData(draft => {
            const index = draft.items.findIndex(m => m.id === data.id)

            if (index >= 0) {
              return
            } else {
              draft.items[index] = data
            }
          })
        }

        const deleteMessageHandler = ({ id }: { id: number }) => {
          updateCachedData(draft => {
            draft.items = draft.items.filter(message => message.id !== id)
          })
        }

        const handleMessageSent = (
          data: Message,
          callback: (payload: { message: Message; receiverId: number }) => void
        ) => {
          const isRelevant =
            data.ownerId === dialoguePartnerId || data.receiverId === dialoguePartnerId

          if (!isRelevant) {
            return
          }

          if (data.receiverId === meId) {
            callback({ message: data, receiverId: meId })
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

        socket.on(WS_EVENTS_PATH.RECEIVE_MESSAGE, handleReceiveMessage)
        socket.on(WS_EVENTS_PATH.MESSAGE_SENT, handleMessageSent)
        socket.on(WS_EVENTS_PATH.UPDATE_MESSAGE, updateMessageHandler)
        socket.on(WS_EVENTS_PATH.MESSAGE_DELETED, deleteMessageHandler)

        await cacheEntryRemoved
        socket.off(WS_EVENTS_PATH.RECEIVE_MESSAGE, handleReceiveMessage)
        socket.off(WS_EVENTS_PATH.MESSAGE_SENT, handleMessageSent)
        socket.off(WS_EVENTS_PATH.UPDATE_MESSAGE, updateMessageHandler)
        socket.off(WS_EVENTS_PATH.MESSAGE_DELETED, deleteMessageHandler)
      },
      query: ({ dialoguePartnerId, params }) => ({
        params,
        url: `v1/messenger/${dialoguePartnerId}`,
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) =>
        `${endpointName}-${queryArgs.dialoguePartnerId}`,
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
    updateMessage: builder.mutation<void, MessageUpdateRequest>({
      queryFn: async body => {
        return new Promise(resolve => {
          socket.emit(WS_EVENTS_PATH.UPDATE_MESSAGE, body, () => {
            resolve({ data: undefined })
          })
          // socket.emit(WS_EVENTS_PATH.UPDATE_MESSAGE, body)
        })
      },
    }),
    updateMessageStatus: builder.mutation<void, { ids: number[] }>({
      query: ({ ids }) => ({
        body: ids,
        method: 'PUT',
        url: `v1/messenger`,
      }),
    }),
  }),
})

export const {
  useDeleteMessageByIdMutation,
  useGetLatestMessagesQuery,
  useGetMessagesByUserQuery,
  useSendMessageMutation,
  useUpdateMessageMutation,
  useUpdateMessageStatusMutation,
} = messengerApi
