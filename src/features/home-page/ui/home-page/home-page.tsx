'use client'
import { usePublicationsFollowersQuery } from '@/features/home-page/api'
import Publication from '@/features/home-page/ui/home-page/publication/publication'
import { ProgressBar } from '@/shared/ui'
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

  console.log('publicationsFollowers', publicationsFollowers)
  if (isError) {
    return <div>ERROR! Posts not found!</div>
  }
  if (publicationsFollowers?.items?.length === 0) {
    return (
      <div className={'flex w-full justify-center items-start text-light-900'}>
        There is no publications yet🙁
      </div>
    )
  }

  return (
    <div className={'flex flex-col w-full justify-center items-center gap-6'}>
      {isLoading || (isFetching && <ProgressBar />)}
      {publicationsFollowers?.items &&
        publicationsFollowers?.items.map(publication => {
          const timeAgo = formatDistanceToNow(new Date(publication.createdAt), { addSuffix: true })
          const postImages = publication.images.map(i => i.url)

          return (
            <Publication
              key={publication.id}
              postImages={postImages}
              publication={publication}
              timeAgo={timeAgo}
            />
          )
        })}
    </div>
  )
}
// <div className={'flex flex-col w-[491px]'} key={publication.id}>
//   <div className={'flex justify-between items-center w-full mb-3'}>
//     <div className={'flex gap-1 justify-center items-center'}>
//       <AvatarBlock
//         avatarOwner={publication.avatarOwner}
//         ownerId={publication.ownerId}
//         userName={publication.userName}
//       />
//       <span className={'text-[12px] text-light-900 mb-1'}>●</span>
//       <p className={'text-[12px] text-light-900'}>{timeAgo}</p>
//     </div>
//     <Dropdown
//       className={'bg-dark-500'}
//       items={dropDownItems}
//       onClick={handleActionDropdown}
//     />
//   </div>
//   <ImageContent itemImages={postImages} />
//   <InteractionButtons isLiked={publication.isLiked} togglePostLike={() => {}} />
//   <Description
//     avatar={publication.avatarOwner}
//     description={publication.description}
//     userName={publication.userName}
//   />
//   <LikesList
//     avatarWhoLikes={publication.avatarWhoLikes}
//     likesCount={publication.likesCount}
//   />
//   <p>----View All Comments----</p>
//   <CommentForm onSubmit={() => {}} />
// </div>
