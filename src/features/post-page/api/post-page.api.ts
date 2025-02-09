import { PublicPostsItems } from '@/features/home-page/types'
import {
  AnswerLikesArgs,
  AnswersResponse,
  CommentLikesResponse,
  CommentsResponse,
  GetCommentAnswersArgs,
  GetPostCommentsArgs,
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
    post: builder.query<PublicPostsItems, { postId: number }>({
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
  usePostCommentsQuery,
  usePostLikesQuery,
  usePostQuery,
  useUserPostsQuery,
} = postPageApi
