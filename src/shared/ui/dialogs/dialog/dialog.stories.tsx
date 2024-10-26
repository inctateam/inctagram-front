import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Button, Dialog, DialogBody, DialogHeader, Typography } from '@/shared/ui'

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  tags: ['autodocs'],
  title: 'UI/Dialogs/Dialog',
} satisfies Meta<typeof Dialog>

export default meta

type Story = StoryObj<typeof meta>

export const WithUseState: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setOpen(true)}>Button With Callback</Button>
        <Dialog closePosition={'inside'} onOpenChange={setOpen} open={open}>
          <DialogHeader>
            <Typography as={'h2'} variant={'h1'}>
              Modal Window
            </Typography>
          </DialogHeader>
          <DialogBody className={'p-6'}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </DialogBody>
        </Dialog>
      </>
    )
  },
}

export const WithTrigger: Story = {
  render: () => {
    return (
      <>
        <Dialog
          closePosition={'outside'}
          trigger={<Button variant={'primary'}>Trigger Button</Button>}
        >
          <DialogBody className={'p-6'}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit
          </DialogBody>
        </Dialog>
      </>
    )
  },
}

export const ManageWidth: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setOpen(true)}>Button With Callback</Button>
        <Dialog
          closePosition={'inside'}
          dialogContentProps={{ className: 'max-w-[492px]' }}
          onOpenChange={setOpen}
          open={open}
        >
          <DialogHeader>
            <Typography as={'h2'} variant={'h1'}>
              Modal Window
            </Typography>
          </DialogHeader>
          <DialogBody className={'p-6'}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aspernatur atque autem
            commodi cumque earum eligendi eos error explicabo hic magnam maiores, nihil numquam
            optio perspiciatis praesentium provident quasi qui quo quod saepe soluta tenetur
            voluptatem! Est, et magni maiores molestiae quos tempore totam veritatis? At excepturi
            fugiat illum suscipit.
          </DialogBody>
        </Dialog>
      </>
    )
  },
}
