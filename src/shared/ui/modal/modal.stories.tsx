import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Button, Typography } from '@/shared/ui'
import { DialogBody } from '@/shared/ui/modal/dialog-body'
import { DialogHeader } from '@/shared/ui/modal/dialog-header'
import { Modal } from '@/shared/ui/modal/modal'

const meta: Meta<typeof Modal> = {
  component: Modal,
  tags: ['autodocs'],
  title: 'UI/Modal',
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof meta>

export const WithUseState: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setOpen(true)}>Button With Callback</Button>
        <Modal closePosition={'inside'} onOpenChange={setOpen} open={open}>
          <DialogHeader>
            <Typography as={'h2'} variant={'h1'}>
              Modal Window
            </Typography>
          </DialogHeader>
          <DialogBody className={'p-6'}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </DialogBody>
        </Modal>
      </>
    )
  },
}

export const WithTrigger: Story = {
  render: () => {
    return (
      <>
        <Modal
          closePosition={'outside'}
          trigger={<Button variant={'primary'}>Trigger Button</Button>}
        >
          <DialogBody className={'p-6'}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit
          </DialogBody>
        </Modal>
      </>
    )
  },
}
