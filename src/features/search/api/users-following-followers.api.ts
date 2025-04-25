import { instagramApi } from '@/services'

import { GetUserByNameResponse, GetUsersResponse } from '../types'

export const usersFollowingFollowersApi = instagramApi.injectEndpoints({
  endpoints: builder => ({
    following: builder.mutation<void, { userId: number }>({
      invalidatesTags: ['UsersByName'],
      query: ({ userId: selectedUserId }) => ({
        body: { selectedUserId },
        method: 'POST',
        url: `v1/users/following`,
      }),
    }),
    getUserByName: builder.query<GetUserByNameResponse, { userName: string }>({
      providesTags: ['UsersByName'],
      query: ({ userName }) => ({
        method: 'GET',
        url: `v1/users/${userName}`,
      }),
    }),
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
    removeFollower: builder.mutation<void, { userId: number }>({
      invalidatesTags: ['UsersByName'],
      query: ({ userId }) => ({
        method: 'DELETE',
        url: `v1/users/follower/${userId}`,
      }),
    }),
  }),
})

export const {
  useFollowingMutation,
  useGetUserByNameQuery,
  useGetUsersQuery,
  useRemoveFollowerMutation,
} = usersFollowingFollowersApi
