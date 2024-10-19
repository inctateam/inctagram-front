import { cn } from '@/shared/utils'

export const ProgressBar = () => {
  return (
    <div className={'absolute top-0 overflow-hidden w-full h-[4px] bg-accent-100'}>
      <div
        className={cn(
          'relative w-full h-full',
          'before:content-[""] before:absolute before:h-full before:bg-accent-700 before:animate-[progressBar1_1.5s_infinite_ease-in-out]',
          'after:content-[""] after:absolute after:h-full after:bg-accent-700 after:animate-[progressBar2_1.5s_infinite_ease-in]'
        )}
      ></div>
    </div>
  )
}
