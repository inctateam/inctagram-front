/*
'use client'
import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { Avatar, Dialog, Typography } from '@/shared/ui'

type Props = {
  avatarOwner?: string
  children?: ReactNode
  onOpenChange: (open: boolean) => void
  open?: boolean
  userName?: string
}

export const EditPost = ({ avatarOwner, children, onOpenChange, open, userName }: Props) => {
  const handleCloseEditPost = () => {
    onOpenChange(true)
  }

  return
  (
    <Dialog closePosition={'inside'} onOpenChange={handleCloseEditPost} open={open}>

    </Dialog>

  )
}
*/
