import { PublicUserProfile } from '@/features/home-page/ui/user-profile'

interface ProfilePageProps {
  userId: number
}

export const ProfilePage = ({ userId }: ProfilePageProps) => {
  // const { data: auth } = useMeQuery()

  // Если пользователь авторизован и его id совпадает с userId, отображаем интерфейс с сайдбаром
  // if (auth && userId === auth?.userId) {
  //   return (
  //     <div className={'flex gap-6 justify-space-between max-h-[660px]'}>
  //       {/*<Sidebar />*/}
  //       {/*<div className={'flex justify-center'}>*/}
  //       {/*  {activeItem === SIDEBAR_ITEMS.HOME && <div>Home page</div>}*/}
  //       {/*  {activeItem === SIDEBAR_ITEMS.MY_PROFILE && <PublicUserProfile userId={userId} />}*/}
  //       {/*  {activeItem === SIDEBAR_ITEMS.CREATE && <div>Create page</div>}*/}
  //       {/*  {activeItem === SIDEBAR_ITEMS.MESSENGER && <div>Messenger page</div>}*/}
  //       {/*  {activeItem === SIDEBAR_ITEMS.SEARCH && <div>Search page</div>}*/}
  //       {/*  {activeItem === SIDEBAR_ITEMS.STATISTICS && <div>Statistics page</div>}*/}
  //       {/*  {activeItem === SIDEBAR_ITEMS.FAVORITES && <div>Favorites page</div>}*/}
  //       {/*</div>*/}
  //     </div>
  //   )
  // }

  // Если пользователь не авторизован, отображаем публичный профиль
  return <PublicUserProfile userId={userId} />
}
