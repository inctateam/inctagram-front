import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Button } from '@/shared/ui'
import { Dialog } from '@/shared/ui/dialog/dialog'

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  tags: ['autodocs'],
  title: 'UI/Dialog',
} satisfies Meta<typeof Dialog>

export default meta

type Story = StoryObj<typeof meta>

export const WithUseState: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setOpen(true)}>Button With Callback</Button>
        <Dialog
          className={'p-6 max-w-[378px]'}
          closePosition={'inside'}
          onOpenChange={setOpen}
          open={open}
          title={'Modal Window'}
        >
          <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
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
          className={'p-6'}
          closePosition={'outside'}
          trigger={<Button variant={'primary'}>Trigger Button</Button>}
        >
          <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
        </Dialog>
      </>
    )
  },
}
