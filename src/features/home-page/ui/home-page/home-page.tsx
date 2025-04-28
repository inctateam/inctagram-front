'use client'
import { usePublicationsFollowersQuery } from '@/features/home-page/api'
import { CommentForm } from '@/features/post-page/ui/interactionBlock/commentForm'
import { InteractionButtons } from '@/features/post-page/ui/interactionBlock/interactionButtonst'
import { LikesList } from '@/features/post-page/ui/interactionBlock/likeList'
import { friendDropDown } from '@/features/post-page/ui/post/post-modal'
import { Description } from '@/features/post-page/ui/postDescription'
import { Dropdown, ImageContent, ProgressBar } from '@/shared/ui'
import { AvatarBlock } from '@/shared/ui/avatar-block'
import { formatDistanceToNow } from 'date-fns'

export const HomePage = () => {
  const {
    data: publicationsFollowers,
    isError,
    isFetching,
    isLoading,
  } = usePublicationsFollowersQuery({
    endCursorPostId: 0,
    pageNumber: 1,
    pageSize: 12,
  })
  const handleActionDropdown = () => {}

  console.log('publicationsFollowers', publicationsFollowers)
  if (isError) {
    return <div>ERROR! Posts not found!</div>
  }
  if (publicationsFollowers?.items === null) {
    return <div>There is no Posts</div>
  }

  return (
    <div className={'flex flex-col w-full justify-center items-center gap-6'}>
      {isLoading || (isFetching && <ProgressBar />)}
      {/*<ul className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 ${className}`}>*/}
      {!!publicationsFollowers?.items &&
        publicationsFollowers?.items.map(publication => {
          const timeAgo = formatDistanceToNow(new Date(publication.createdAt), { addSuffix: true })
          const postImages = publication.images.map(i => i.url)

          return (
            <div className={'flex flex-col w-[491px]'} key={publication.id}>
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
                <Dropdown
                  className={'bg-dark-500'}
                  items={friendDropDown}
                  onClick={handleActionDropdown}
                />
              </div>
              <ImageContent itemImages={postImages} />
              <InteractionButtons isLiked={publication.isLiked} togglePostLike={() => {}} />
              <Description
                avatar={publication.avatarOwner}
                createdAt={publication.createdAt}
                description={publication.description}
                isTimeAgoMode={false}
                userName={publication.userName}
              />
              <LikesList
                avatarWhoLikes={publication.avatarWhoLikes}
                createdAt={publication.createdAt}
                likesCount={publication.likesCount}
              />
              <p>----View All Comments----</p>
              <CommentForm onSubmit={() => {}} />
            </div>
          )
        })}
      {/*</ul>*/}
    </div>
  )
}
