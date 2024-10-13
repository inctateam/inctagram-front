import { useState } from 'react'

import { Button } from '@/shared/ui'
import { ConfirmDialog } from '@/shared/ui/modal/dialogs'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ConfirmDialog> = {
  component: ConfirmDialog,
  tags: ['autodocs'],
  title: 'UI/Modal/Dialogs',
}

export default meta

type Story = StoryObj<typeof meta>

export const WithUseState: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    const onCancel = () => setOpen(false)
    const onConfirm = () => setOpen(false)

    return (
      <>
        <Button onClick={() => setOpen(true)}>Button With Callback</Button>
        <ConfirmDialog
          onCancel={onCancel}
          onConfirm={onConfirm}
          onOpenChange={setOpen}
          open={open}
          title={'Confirm'}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua
        </ConfirmDialog>
      </>
    )
  },
}
