import { useState } from 'react'

import { AlertDialog, Button, CancelButton, ConfirmButton } from '@/shared/ui'

const meta = {
  argTypes: {
    description: { control: 'text' },
    position: { control: 'text' },
    title: { control: 'text' },
  },
  component: AlertDialog,
  tags: ['autodocs'],
  title: 'UI/Dialogs/AlertDialog',
}

export default meta

export const Controlled = {
  args: {
    description: 'Are you sure you want to delete this post?',
    position: 'center',
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
        {isVisible && (
          <AlertDialog
            open={isVisible}
            {...args}
            cancelButton={<CancelButton>No</CancelButton>}
            confirmButton={<ConfirmButton>Yes</ConfirmButton>}
            onOpenChange={handleOpenChange}
          />
        )}
      </div>
    )
  },
}

export const Uncontrolled = {
  args: {
    description:
      'Do you really want to close the edition of the publication? If you close changes won’t be saved',
    position: 'center',
    title: 'Close post',
  },
  render: ({ ...args }) => {
    return (
      <AlertDialog
        {...args}
        cancelButton={<CancelButton>No</CancelButton>}
        confirmButton={<ConfirmButton>Yes</ConfirmButton>}
        trigger={<Button>Show alert dialog</Button>}
      />
    )
  },
}
