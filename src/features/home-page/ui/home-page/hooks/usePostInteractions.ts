import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { handleRequestError } from '@/features/auth/utils/handleRequestError'
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
import { useBoolean } from '@/shared/hooks'

export const usePostInteractions = (publication: PublicationsFollowersItem) => {
  const [isFollowing, setIsFollowing] = useState(true)
  const [isLiked, { setFalse: setUnLike, setTrue: setLike }] = useBoolean(false)
  const { data } = useGetUserByNameQuery({ userName: publication.userName })
  const [follow] = useFollowingMutation()
  const [unFollow] = useRemoveFollowerMutation()
  const [updateLikeStatus] = useUploadPostLikeStatusMutation()
  const [addPostComment] = useAddPostCommentMutation()
  const { data: publicationComments } = usePostCommentsQuery({ postId: publication.id })

  useEffect(() => {
    if (data?.isFollowing) {
      setIsFollowing(true)
    }

    if (publication.isLiked) {
      setLike()
    } else {
      setUnLike()
    }
  }, [publication.isLiked])

  const handleLikeToggle = async () => {
    const likeStatus = isLiked ? 'NONE' : 'LIKE'

    try {
      // if (likeStatus === 'LIKE') {
      //   setLike()
      // } else {
      //   setUnLike()
      // }
      await updateLikeStatus({ likeStatus, postId: publication.id }).unwrap()
    } catch (e) {
      if (likeStatus === 'LIKE') {
        setUnLike()
      } else {
        setLike()
      }
      handleRequestError(e)
    }
  }

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await unFollow({ userId: publication.ownerId }).unwrap()
        setIsFollowing(false)
        toast.success('You un-followed')
      } else {
        await follow({ userId: publication.ownerId }).unwrap()
        setIsFollowing(true)
        toast.success('You followed')
      }
    } catch (e) {
      handleRequestError(e)
    }
  }

  const handleCopyLink = () => {
    const profileUrl = `${window.location.origin}/profile/${publication.ownerId}/${publication.id}`

    navigator.clipboard.writeText(profileUrl)
    toast('Link copied to clipboard')
  }

  const addPostCommentHandle = async (content: string) => {
    if (content.length === 0) {
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
    comments: publicationComments?.items || [],
    handleCopyLink,
    handleFollowToggle,
    handleLikeToggle,
    isFollowing,
  }
}
