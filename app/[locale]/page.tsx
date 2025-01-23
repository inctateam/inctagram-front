import { CenteredLayout } from '@/layouts'
import { MeTest } from '@/shared/ui/me-test'

export default function Home() {
  return (
    <CenteredLayout>
      <div className={'w-full max-w-[972px] mx-auto'}>
        Home Page
        <MeTest />
      </div>
    </CenteredLayout>
  )
}
