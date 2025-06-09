import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import { Edit, Trash } from '@/assets/icons'
import { Button } from '@/shared/ui'

type Props = {
  onClose: () => void
  onDelete: () => void
  onEdit: () => void
  x: number
  y: number
}
export const ContextMenuMessage = ({ onClose, onDelete, onEdit, x, y }: Props) => {
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !(menuRef.current as HTMLElement).contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  return createPortal(
    <div
      className={
        'flex flex-col items-start absolute z-50 bg-dark-300 border border-dark-500 ' +
        'rounded-tr-md rounded-br-md rounded-bl-md shadow-md w-50 py-2'
      }
      ref={menuRef}
      style={{ left: x, top: y }}
    >
      <Button
        className={'w-full justify-start'}
        onClick={onEdit}
        startIcon={<Edit />}
        variant={'secondary'}
      >
        Редактировать
      </Button>
      <Button
        className={'w-full justify-start'}
        onClick={onDelete}
        startIcon={<Trash />}
        variant={'secondary'}
      >
        Удалить
      </Button>
    </div>,
    document.body
  )
}
