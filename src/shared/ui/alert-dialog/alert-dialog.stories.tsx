import { useState } from 'react'

import { Button } from '@/shared/ui'
import { AlertDialog } from '@/shared/ui/alert-dialog/alert-dialog'

const meta = {
  argTypes: {
    description: { control: 'text' },
    position: { control: 'text' },
    title: { control: 'text' },
  },
  component: AlertDialog,
  tags: ['autodocs'],
  title: 'UI/AlertDialog',
}

export default meta

export const DeleteDialog = {
  args: {
    description: 'Are you sure you want to delete this post?',
    position: 'bottom-left',
    title: 'Delete post',
  },
  render: ({ ...args }) => {
    const [isVisible, setIsVisible] = useState(false)

    const handleOpenChange = (open: boolean) => {
      setIsVisible(open)
    }

    return (
      <div>
        <Button
          onClick={() => {
            setIsVisible(true)
          }}
        >
          Show alert dialog
        </Button>
        {isVisible && <AlertDialog open={isVisible} {...args} onOpenChange={handleOpenChange} />}
      </div>
    )
  },
}

export const ClosePostDialog = {
  args: {
    description:
      'Do you really want to close the edition of the publication? If you close changes won’t be saved',
    position: 'center',
    title: 'Close post',
  },
  render: ({ ...args }) => {
    const [isVisible, setIsVisible] = useState(false)

    const handleOpenChange = (open: boolean) => {
      setIsVisible(open)
    }

    return (
      <div>
        <Button
          onClick={() => {
            setIsVisible(true)
          }}
        >
          Show alert dialog
        </Button>
        {isVisible && <AlertDialog open={isVisible} {...args} onOpenChange={handleOpenChange} />}
      </div>
    )
  },
}
