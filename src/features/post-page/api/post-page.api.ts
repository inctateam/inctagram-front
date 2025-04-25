import { PublicPostItem } from '@/features/home-page/types'
import {
  AnswerLikesArgs,
  AnswersResponse,
  CommentLikesResponse,
  CommentsResponse,
  GetCommentAnswersArgs,
  GetPostCommentsArgs,
  UploadFileResponse,
  UserPostResponse,
  UserPostsArgs,
} from '@/features/post-page/types/post-page.types'
import { instagramApi } from '@/services'

// PublicPostsItems проверить тип на соответствие приватному посту
export const postPageApi = instagramApi.injectEndpoints({
  endpoints: builder => ({
    answerLikes: builder.query<string, AnswerLikesArgs>({
      query: ({ answerId, commentId, postId, ...params }) => ({
        params,
        url: `v1/posts/${postId}/comments/${commentId}/answers/${answerId}/likes`,
      }),
    }),
    commentAnswers: builder.query<AnswersResponse, GetCommentAnswersArgs>({
      query: ({ commentId, postId, ...params }) => ({
        params,
        url: `v1/posts/${postId}/comments/${commentId}/answers`,
      }),
    }),
    commentLikes: builder.query<CommentLikesResponse, GetCommentAnswersArgs>({
      query: ({ commentId, postId, ...params }) => ({
        params,
        url: `v1/posts/${postId}/comments/${commentId}/likes`,
      }),
    }),
    createPost: builder.mutation<PublicPostItem, { description: string; uploadIds: string[] }>({
      query: ({ description, uploadIds }) => {
        return {
          body: {
            childrenMetadata: uploadIds.map(id => {
              return {
                uploadId: id,
              }
            }),
            description,
          },
          method: 'POST',
          url: 'v1/posts',
        }
      },
    }),
    deletePost: builder.mutation<void, { postId: number }>({
      query: ({ postId }) => ({
        method: 'DELETE',
        url: `v1/posts/${postId}`,
      }),
    }),
    post: builder.query<PublicPostItem, { postId: number }>({
      query: ({ postId, ...params }) => ({
        params,
        url: `v1/posts/id/${postId}`,
      }),
    }),
    postComments: builder.query<CommentsResponse, GetPostCommentsArgs>({
      query: ({ postId, ...params }) => ({
        params,
        url: `v1/posts/${postId}/comments`,
      }),
    }),
    postLikes: builder.query<CommentLikesResponse, GetPostCommentsArgs>({
      query: ({ postId, ...params }) => ({
        params,
        url: `v1/posts/${postId}/likes`,
      }),
    }),
    uploadDescription: builder.mutation<void, { description: string; postId: number }>({
      query: ({ description, postId }) => ({
        body: { description },
        method: 'PUT',
        url: `v1/posts/${postId}`,
      }),
    }),
    uploadImageForPost: builder.mutation<UploadFileResponse, { file: File }>({
      query: ({ file }) => {
        const formData = new FormData()

        formData.append('file', file)

        return {
          body: formData,
          method: 'POST',
          url: 'v1/posts/image',
        }
      },
    }),
    uploadPostLikeStatus: builder.mutation<void, { postId: number }>({
      query: ({ postId }) => ({
        method: 'PUT',
        url: `v1/posts/${postId}/like-status`,
      }),
    }),
    userPosts: builder.query<UserPostResponse, UserPostsArgs>({
      query: ({ userName, ...params }) => ({
        params,
        url: `v1/posts/${userName}`,
      }),
    }),
  }),
})

export const {
  useAnswerLikesQuery,
  useCommentAnswersQuery,
  useCommentLikesQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  usePostCommentsQuery,
  usePostLikesQuery,
  usePostQuery,
  useUploadDescriptionMutation,
  useUploadImageForPostMutation,
  useUploadPostLikeStatusMutation,
  useUserPostsQuery,
} = postPageApi
