import { GetLatestMessages, GetMessagesQueryParams } from '@/features/messenger/types'
import { instagramApi } from '@/services'

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
      void,
      { dialoguePartnerId: number; params: GetMessagesQueryParams }
    >({
      query: ({ dialoguePartnerId, params }) => ({
        params,
        url: `v1/messanger/${dialoguePartnerId}`,
      }),
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
