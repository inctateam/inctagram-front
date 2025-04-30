'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { PersonAdd, PersonRemoveOutline } from '@/assets/icons'
import CopyOutline from '@/assets/icons/components/filled-outlined-pairs/CopyOutline'
import { handleRequestError } from '@/features/auth/utils/handleRequestError'
import { PublicationsFollowersItem } from '@/features/home-page/types'
import { useUploadPostLikeStatusMutation } from '@/features/post-page/api'
import { CommentForm } from '@/features/post-page/ui/interactionBlock/commentForm'
import { InteractionButtons } from '@/features/post-page/ui/interactionBlock/interactionButtonst'
import { LikesList } from '@/features/post-page/ui/interactionBlock/likeList'
import { Description } from '@/features/post-page/ui/postDescription'
import {
  useFollowingMutation,
  useGetUserByNameQuery,
  useRemoveFollowerMutation,
} from '@/features/search/api/users-following-followers.api'
import { useBoolean } from '@/shared/hooks'
import { Dropdown, ImageContent } from '@/shared/ui'
import { AvatarBlock } from '@/shared/ui/avatar-block'
type Props = {
  postImages: string[]
  publication: PublicationsFollowersItem
  timeAgo: string
}
const Publication = ({ postImages, publication, timeAgo }: Props) => {
  const [isFollowing, setIsFollowing] = useState(true)
  const [isLiked, { setFalse: setUnLike, setTrue: setLike }] = useBoolean(false)

  const { data } = useGetUserByNameQuery({ userName: publication.userName })
  const [follow] = useFollowingMutation()
  const [unFollow] = useRemoveFollowerMutation()
  const [updateLikeStatus] = useUploadPostLikeStatusMutation()
  const dropDownItems = [
    {
      action: isFollowing ? 'unfollow' : 'follow',
      icon: isFollowing ? <PersonRemoveOutline /> : <PersonAdd />,
      label: isFollowing ? 'Un-Follow' : 'Follow',
    },
    {
      action: 'copy-link',
      icon: <CopyOutline />,
      label: 'Copy Link',
    },
  ]

  useEffect(() => {
    if (data?.isFollowing) {
      setIsFollowing(true)
    }
    if (publication?.isLiked) {
      setLike()
    }
  }, [])
  const handleActionDropdown = async (label: string) => {
    const userId = publication.ownerId

    if (label === 'Copy Link') {
      alert('Copy Link')
    }
    if (label === 'Follow') {
      try {
        await follow({ userId }).unwrap()
        setIsFollowing(true)
        toast.success('You followed')
      } catch (e) {
        console.log(e)
        toast.error('Some error')
      }
    }
    if (label === 'Un-Follow') {
      try {
        await unFollow({ userId }).unwrap()
        setIsFollowing(false)
        toast.success('You un-followed')
      } catch (e) {
        console.log(e)
        toast.error('Some error')
      }
    }
  }
  const onLikeClickHandler = async () => {
    const likeStatus = isLiked ? 'NONE' : 'LIKE'

    try {
      await updateLikeStatus({ likeStatus, postId: publication.id }).unwrap()

      if (likeStatus === 'LIKE') {
        setLike()
      } else {
        setUnLike()
      }
    } catch (e) {
      handleRequestError(e)
    }
  }

  return (
    <div className={'flex flex-col w-[491px]'}>
      <div className={'flex justify-between items-center w-full mb-3'}>
        <div className={'flex gap-1 justify-center items-center'}>
          <AvatarBlock
            avatarOwner={publication.avatarOwner}
            ownerId={publication.ownerId}
            userName={publication.userName}
          />
          <span className={'text-[12px] text-light-900 mb-1'}>●</span>
          <p className={'text-[12px] text-light-900'}>{timeAgo}</p>
        </div>
        <Dropdown className={'bg-dark-500'} items={dropDownItems} onClick={handleActionDropdown} />
      </div>
      <ImageContent itemImages={postImages} />
      <InteractionButtons isLiked={isLiked} togglePostLike={onLikeClickHandler} />
      <Description
        avatar={publication.avatarOwner}
        description={publication.description}
        userName={publication.userName}
      />
      <LikesList avatarWhoLikes={publication.avatarWhoLikes} likesCount={publication.likesCount} />
      <p>----View All Comments----</p>
      <CommentForm onSubmit={() => {}} />
    </div>
  )
}

export default Publication
