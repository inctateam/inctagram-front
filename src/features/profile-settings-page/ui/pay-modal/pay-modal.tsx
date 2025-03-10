'use client'

import { ReactNode, useState } from 'react'
import { createPortal } from 'react-dom'

import { Button, Dialog, Typography } from '@/shared/ui'
import RoundedCheckbox from '@/shared/ui/checkbox/rounded-checkbox'

type Props = {
  buttonText: string
  checkbox?: boolean
  children: ReactNode
  onOpenChange: (isClosePost: boolean) => void
  open: boolean
  titleText?: string
}

export const PayModal = ({
  buttonText,
  checkbox = false,
  children,
  onOpenChange,
  open,
  titleText,
}: Props) => {
  const [selected, setSelected] = useState(false)
  const handleChangeCheckbox = () => {
    setSelected(prev => !prev)
  }
  const handleButtonClick = () => {
    onOpenChange(false)
    setSelected(false)
  }
  const handleDialogClose = () => {
    onOpenChange(false)
    setSelected(false)
  }

  return createPortal(
    <Dialog closePosition={'inside'} onOpenChange={handleDialogClose} open={open}>
      <div className={'flex flex-col w-[30rem] h-[100%] bg-dark-300 border border-dark-100'}>
        <Typography
          className={'flex items-center pl-6 h-[4rem] border-b border-dark-100'}
          variant={'h1'}
        >
          {titleText}
        </Typography>
        <Typography className={'py-7 px-6'} variant={'regular16'}>
          {children}
        </Typography>
        <div className={'flex items-center justify-end pr-6 pb-7 gap-6'}>
          {checkbox && (
            <RoundedCheckbox checked={selected} label={'Agree'} onChange={handleChangeCheckbox} />
          )}
          <Button
            className={'w-24'}
            disabled={!selected}
            onClick={handleButtonClick}
            variant={'primary'}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </Dialog>,
    document.body
  )
}
