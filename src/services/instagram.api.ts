import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const instagramApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://inctagram.work/api/',
    credentials: 'include',
    prepareHeaders: headers => {
      const token = localStorage.getItem('access_token')

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: () => ({}),
  reducerPath: 'instagramApi',
  tagTypes: [
    'Me',
    'MyProfile',
    'Notifications',
    'UsersByName',
    'PublicUserProfile',
    'PublicPostsByUserId',
    'PublicationsFollowers',
    'PostComments',
    'PostLikes',
  ],
})
