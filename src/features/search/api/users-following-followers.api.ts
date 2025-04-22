import { instagramApi } from '@/services'

import { GetUsersResponse } from '../types'

export const usersFollowingFollowersApi = instagramApi.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<
      GetUsersResponse,
      {
        cursor?: number
        pageNumber?: number
        pageSize?: number
        search?: string
      }
    >({
      forceRefetch: params => Boolean(params.currentArg?.cursor),
      merge: (currentCache, newItems) => {
        return {
          ...newItems,
          items: [
            ...(currentCache.items || []),
            ...newItems.items.filter(item => !currentCache.items?.find(i => i.id === item.id)),
          ],
        }
      },
      query: ({ cursor, pageNumber, pageSize, search }) => ({
        method: 'GET',
        params: { cursor, pageNumber, pageSize, search },
        url: `v1/users`,
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => `${endpointName} ${queryArgs.search}`,
    }),
  }),
})

export const { useGetUsersQuery } = usersFollowingFollowersApi
