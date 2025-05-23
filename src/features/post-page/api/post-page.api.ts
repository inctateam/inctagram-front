import { PublicPostItem } from '@/features/home-page/types'
import {
  Answer,
  AnswerLikesArgs,
  AnswersResponse,
  CommentItems,
  CommentLikesResponse,
  CommentsResponse,
  GetCommentAnswersArgs,
  GetPostCommentsArgs,
  PostLikeStatus,
  UploadFileResponse,
  UserPostResponse,
  UserPostsArgs,
} from '@/features/post-page/types/post-page.types'
import { instagramApi } from '@/services'

// PublicPostsItems проверить тип на соответствие приватному посту
export const postPageApi = instagramApi.injectEndpoints({
  endpoints: builder => ({
    addPostComment: builder.mutation<CommentItems, { content: string; postId: number }>({
      invalidatesTags: ['PostComments'],
      // invalidatesTags: [{ id: 'LIST', type: 'PublicationsFollowers' }, 'PostComments'],
      query: ({ content, postId }) => ({
        body: { content },
        method: 'POST',
        url: `v1/posts/${postId}/comments`,
      }),
    }),
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
    createCommentAnswer: builder.mutation<
      Answer,
      { commentId: number; content: string; postId: number }
    >({
      query: ({ commentId, content, postId }) => ({
        body: { content },
        method: 'POST',
        url: `v1/posts/${postId}/comments/${commentId}/answers`,
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
      providesTags: ['Post'],
      query: ({ postId, ...params }) => ({
        params,
        url: `v1/posts/id/${postId}`,
      }),
    }),
    postComments: builder.query<CommentsResponse, GetPostCommentsArgs>({
      providesTags: ['PostComments'],
      query: ({ postId, ...params }) => ({
        params,
        url: `v1/posts/${postId}/comments`,
      }),
    }),
    postLikes: builder.query<CommentLikesResponse, GetPostCommentsArgs>({
      providesTags: ['PostLikes'],
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
    uploadPostLikeStatus: builder.mutation<void, { likeStatus: PostLikeStatus; postId: number }>({
      invalidatesTags: [
        { id: 'LIST', type: 'PublicationsFollowers' },
        'PublicPostsByUserId',
        'Post',
      ],
      query: ({ likeStatus = 'NONE', postId }) => ({
        body: { likeStatus },
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
  useAddPostCommentMutation,
  useAnswerLikesQuery,
  useCommentAnswersQuery,
  useCommentLikesQuery,
  useCreateCommentAnswerMutation,
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
