import { cn } from '@/shared/utils'

type Props = {
  fullScreen?: boolean
}

export const Spinner = ({ fullScreen = false }: Props) => {
  return (
    <div
      className={cn(fullScreen ? 'h-screen' : 'h-full', 'flex items-center justify-center w-full')}
    >
      <span
        className={cn(
          'rounded-full inline-block border-t-4 border-t-accent-100 border-r-4 border-r-transparent animate-[rotation_1s_linear_infinite]',
          `w-[48px] h-[48px]`
        )}
      >
        <span
          className={cn(
            'absolute left-0 top-0 rounded-full border-l-4 border-l-accent-900 border-b-4 border-b-transparent animate-[rotation_0.5s_linear_infinite_reverse]',
            `w-[48px] h-[48px]`
          )}
        ></span>
      </span>
    </div>
  )
}
