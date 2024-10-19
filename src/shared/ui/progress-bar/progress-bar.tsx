export const ProgressBar = () => {
  return (
    <div className={'absolute top-0 overflow-hidden w-full h-[4px] bg-accent-100'}>
      <div className={'relative w-full h-full'}>
        <span
          className={
            'absolute h-full bg-accent-700 animate-[progressBar1_1.5s_infinite_ease-in-out]'
          }
        ></span>
        <span
          className={'absolute h-full bg-accent-700 animate-[progressBar2_1.5s_infinite_ease-in]'}
        ></span>
      </div>
    </div>
  )
}
