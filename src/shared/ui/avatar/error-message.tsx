type Props = {
  errorMessage: '' | 'maxSizeError' | 'validFormatsError'
}

export const ErrorMessage = ({ errorMessage }: Props) => {
  return (
    <div className={'flex justify-center items-center -mt-12 mb-6'}>
      <div
        className={
          'w-[445px] bg-danger-900 text-[15px] tracking-wide font-light border border-danger-500 flex justify-center items-center rounded-sm'
        }
      >
        {errorMessage === 'maxSizeError' ? (
          <p className={'py-[6px]'}>
            <span className={'font-bold text-sm'}>Error! </span>
            Photo size must be less than 10 MB!
          </p>
        ) : (
          <p className={'py-[6px] text-center'}>
            <span className={'font-bold text-sm'}>Error! </span>
            The format of the uploaded photo must be <br /> PNG and JPEG
          </p>
        )}
      </div>
    </div>
  )
}
