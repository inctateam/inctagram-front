import { CenteredLayout } from '@/layouts'
import { Sidebar } from '@/shared/ui/sidebar'

export default function Home() {
  return (
    <CenteredLayout>
      {/* <div className={'w-full max-w-[972px] mx-auto'}>Home Page</div> */}
      <Sidebar />
    </CenteredLayout>
  )
}
