import { HomePage } from '@/features/home-page/ui/home-page'
import { CenteredLayout } from '@/layouts'

export default function Home() {
  return (
    <CenteredLayout>
      <div className={'w-full max-w-[972px] mx-auto'}>
        <HomePage />
      </div>
    </CenteredLayout>
  )
}
