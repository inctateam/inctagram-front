import React, { forwardRef, useState } from 'react'

import { CheckmarkOutline, DoneAllOutline } from '@/assets/icons'
import { Message } from '@/features/messenger/types'
import { ContextMenuMessage } from '@/features/messenger/ui/messegePanel/context-menu-message'
import { formatMessageDate } from '@/features/messenger/utils/formatMessageDate'
import { Avatar, Typography } from '@/shared/ui'
import { cn } from '@/shared/utils'

const UserMessageItem = forwardRef<
  HTMLDivElement,
  {
    dialogItem: Message
    meId: number
    onEditMessage: (editMessage: Message) => void
    userAvatar: string
  }
>(({ dialogItem, meId, onEditMessage, userAvatar }, ref) => {
  const { createdAt, id, messageText, ownerId, status, updatedAt } = dialogItem
  const isMyMessage = meId === ownerId
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null)
  const isUpdatedMessage = createdAt !== updatedAt
  const formattedDate = `${isUpdatedMessage ? 'Updated ' : ''}${formatMessageDate(
    isUpdatedMessage ? updatedAt : createdAt,
    true
  )}`
  const handleContextMenu = (e: React.MouseEvent) => {
    if (!isMyMessage) {
      return
    }
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY })
  }

  const handleCloseMenu = () => setContextMenu(null)

  const handleEdit = () => {
    onEditMessage(dialogItem)
    handleCloseMenu()
  }

  const handleDelete = () => {
    alert(`Удалить сообщение:, ${id}`)
    handleCloseMenu()
  }

  return (
    <div
      className={cn('flex items-end gap-3', isMyMessage ? 'justify-end' : 'justify-start')}
      ref={ref}
    >
      {!isMyMessage && <Avatar alt={'user avatar'} size={9} src={userAvatar} />}
      <div
        className={cn(
          'flex flex-col px-3 py-2 gap-1 max-w-[275px] rounded-md',
          isMyMessage ? 'bg-accent-700' : 'bg-dark-300'
        )}
        onContextMenu={handleContextMenu}
      >
        <Typography className={'text-pretty'} variant={'regular14'}>
          {messageText}
        </Typography>
        <div className={'flex items-center justify-end gap-1'}>
          <Typography
            className={cn('text-xs', isMyMessage ? 'text-accent-100' : 'text-light-900')}
            variant={'small'}
          >
            {formattedDate}
          </Typography>
          {isMyMessage &&
            (status === 'READ' ? (
              <DoneAllOutline className={'w-4 h-4 text-accent-100'} />
            ) : (
              <CheckmarkOutline className={'w-4 h-4 text-accent-100'} />
            ))}
        </div>
      </div>
      {contextMenu && (
        <ContextMenuMessage
          onClose={handleCloseMenu}
          onDelete={handleDelete}
          onEdit={handleEdit}
          x={contextMenu.x}
          y={contextMenu.y}
        />
      )}
    </div>
  )
})

export default UserMessageItem
