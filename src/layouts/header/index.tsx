import { Container } from '@/layouts'
import { PATH } from '@/shared/constants'
import { TextLink } from '@/shared/ui'
import { cn } from '@/shared/utils'

export const Header = () => {
  return (
    <div className={cn('sticky top-0', 'w-full h-[59px]', 'border-b border-dark-300 border-solid')}>
      <Container className={'h-full flex items-center justify-between'}>
        <TextLink
          className={'text-2.5xl font-medium'}
          color={'regular'}
          href={PATH.ROOT}
          underline={false}
        >
          Inctagram
        </TextLink>
        <span>Select language</span>
      </Container>
    </div>
  )
}
