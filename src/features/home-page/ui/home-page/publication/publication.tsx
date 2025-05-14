'use client'

import { useState } from 'react'

import { EditOutline, PersonAdd, PersonRemoveOutline, TrashOutline } from '@/assets/icons'
import CopyOutline from '@/assets/icons/components/filled-outlined-pairs/CopyOutline'
import { MeResponse } from '@/features/auth/types'
import { handleRequestError } from '@/features/auth/utils/handleRequestError'
import { PublicationsFollowersItem } from '@/features/home-page/types'
import { usePostInteractions } from '@/features/home-page/ui/home-page/hooks/usePostInteractions'
import { CommentForm } from '@/features/post-page/ui/interactionBlock/commentForm'
import { InteractionButtons } from '@/features/post-page/ui/interactionBlock/interactionButtonst'
import { LikesList } from '@/features/post-page/ui/interactionBlock/likeList'
import { PostModal } from '@/features/post-page/ui/post/post-modal'
import { Description } from '@/features/post-page/ui/postDescription'
import { Dropdown, ImageContent } from '@/shared/ui'
import { AvatarBlock } from '@/shared/ui/avatar-block'

type Props = {
  me: MeResponse | undefined
  onToggleLike?: () => void
  postImages: string[]
  publication: PublicationsFollowersItem
  statusLiked?: boolean
  timeAgo: string
}
const Publication = ({
  me,
  onToggleLike,
  postImages,
  publication,
  statusLiked,
  timeAgo,
}: Props) => {
  const [openPostId, setOpenPostId] = useState(false)
  const [isLiked, setIsLiked] = useState(
    statusLiked !== undefined ? statusLiked : publication.isLiked
  )
  const {
    addPostCommentHandle,
    handleCopyLink,
    handleFollowToggle,
    handleLikeToggle,
    isFollowing,
    privateComments,
    publicComments,
    publicPost,
  } = usePostInteractions(publication, statusLiked)
  const commentsPrivateOrPublic = me ? privateComments : publicComments
  const dropDownItemsStranger = [
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
  const dropDownItemsMine = [
    {
      action: 'delete-post',
      icon: <TrashOutline />,
      label: 'Delete post',
    },
    {
      action: 'edit-post',
      icon: <EditOutline />,
      label: 'Edit post',
    },
  ]
  const dropDownItems =
    me?.userId === publication.ownerId ? dropDownItemsMine : dropDownItemsStranger
  const handleActionDropdown = async (label: string) => {
    if (label === 'Copy Link') {
      return handleCopyLink()
    }
    if (label === 'Follow' || label === 'Un-Follow') {
      return handleFollowToggle()
    }
  }
  const handleActionLikeToggle = async () => {
    try {
      setIsLiked(prev => !prev)
      onToggleLike?.()
      await handleLikeToggle()
    } catch (e) {
      setIsLiked(prev => !prev)
      onToggleLike?.()
      handleRequestError(e)
    }
  }
  const handleOpenPostModal = () => {
    setOpenPostId(prev => !prev)
  }
  const handleClosePostModal = () => {
    setOpenPostId(prev => !prev)
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
        {me?.userId && (
          <Dropdown
            className={'bg-dark-500'}
            items={dropDownItems}
            onClick={handleActionDropdown}
          />
        )}
      </div>
      <ImageContent
        className={'cursor-pointer'}
        itemImages={postImages}
        onClick={handleOpenPostModal}
      />
      <div className={'flex justify-start items-center gap-5'}>
        {me?.userId && (
          <InteractionButtons isLiked={isLiked} togglePostLike={handleActionLikeToggle} />
        )}
      </div>
      <div className={'flex items-start gap-3 my-3'}>
        <Description
          avatar={publication.avatarOwner}
          description={publication.description}
          userName={publication.userName}
        />
      </div>
      <LikesList
        avatarWhoLikes={publicPost?.avatarWhoLikes || []}
        likesCount={publication.likesCount}
      />
      {commentsPrivateOrPublic.items.length > 0 && (
        <p className={'mt-2 text-light-700 cursor-pointer'} onClick={handleOpenPostModal}>
          View All Comments ({commentsPrivateOrPublic.items.length})
        </p>
      )}
      <CommentForm onSubmit={addPostCommentHandle} />
      {openPostId && (
        <PostModal me={me} onOpenChange={handleClosePostModal} open={openPostId} post={publication}>
          <ImageContent itemImages={publication.images.map(image => image.url)} />
        </PostModal>
      )}
    </div>
  )
}

export default Publication
