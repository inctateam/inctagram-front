import { CenteredLayout } from '@/layouts'
import { HomePage } from '@/widgets/home-page'


export default function Home() {
  return (
    <CenteredLayout>
      <div className={'w-full max-w-[972px] mx-auto'}>
        <HomePage />
      </div>
    </CenteredLayout>
  )
}
