import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { handleRequestError } from '@/features/auth/utils/handleRequestError'
import { usePublicPostCommentsQuery, usePublicPostsByIdQuery } from '@/features/home-page/api'
import { PublicationsFollowersItem } from '@/features/home-page/types'
import {
  useAddPostCommentMutation,
  usePostCommentsQuery,
  useUploadPostLikeStatusMutation,
} from '@/features/post-page/api'
import {
  useFollowingMutation,
  useGetUserByNameQuery,
  useRemoveFollowerMutation,
} from '@/features/search/api/users-following-followers.api'

export const usePostInteractions = (
  publication: PublicationsFollowersItem,
  statusLiked?: boolean
) => {
  const { data: userByName } = useGetUserByNameQuery({ userName: publication.userName })
  const [isFollowing, setIsFollowing] = useState<boolean>(() => !!userByName?.isFollowing)
  const [isLiked, setIsLiked] = useState(statusLiked ?? publication.isLiked)
  const [follow] = useFollowingMutation()
  const [unFollow] = useRemoveFollowerMutation()
  const [updateLikeStatus] = useUploadPostLikeStatusMutation()
  const [addPostComment] = useAddPostCommentMutation()

  const { data: publicPost, refetch: refetchPost } = usePublicPostsByIdQuery({
    postId: publication.id,
  })
  const { data: publicComments } = usePublicPostCommentsQuery({ postId: publication.id })
  const { data: privateComments } = usePostCommentsQuery({ postId: publication.id })

  useEffect(() => {
    setIsLiked(statusLiked ?? publication.isLiked)
  }, [statusLiked, publication.isLiked])

  const handleLikeToggle = async () => {
    const likeStatus = isLiked ? 'NONE' : 'LIKE'

    try {
      setIsLiked(prev => !prev) // optimistic update
      await updateLikeStatus({ likeStatus, postId: publication.id }).unwrap()
      refetchPost()
    } catch (e) {
      setIsLiked(prev => !prev) // rollback
      handleRequestError(e)
    }
  }

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await unFollow({ userId: publication.ownerId }).unwrap()
        setIsFollowing(false)
        toast.success('You unfollowed')
      } else {
        await follow({ userId: publication.ownerId }).unwrap()
        setIsFollowing(true)
        toast.success('You followed')
      }
    } catch (e) {
      handleRequestError(e)
    }
  }

  const handleCopyLink = async () => {
    const postUrl = `${window.location.origin}/profile/${publication.ownerId}/${publication.id}`

    try {
      await navigator.clipboard.writeText(postUrl)
      toast('Link copied to clipboard')
    } catch (e) {
      handleRequestError(e)
    }
  }

  const addPostCommentHandle = async (content: string) => {
    if (!content.trim()) {
      return
    }
    try {
      await addPostComment({ content, postId: publication.id }).unwrap()
    } catch (e) {
      handleRequestError(e)
    }
  }

  return {
    addPostCommentHandle,
    handleCopyLink,
    handleFollowToggle,
    handleLikeToggle,
    isFollowing,
    isLiked,
    privateComments: privateComments ?? { items: [] },
    publicComments: publicComments ?? { items: [] },
    publicPost,
  }
}
