import type { Meta, StoryObj } from '@storybook/react'

import { useGenerateId } from '@/shared/hooks'
import { Label, Typography } from '@/shared/ui'

const meta = {
  component: Label,
  tags: ['autodocs'],
  title: 'UI/Label',
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const BareLabel = {
  args: {
    children: <Label>I am headless label from RadixUI</Label>,
  },
}

export const Usage: Story = {
  render: () => {
    const id = useGenerateId()

    return (
      <div className={'inline-flex flex-col'}>
        <Typography as={Label} htmlFor={id} variant={'regular14'}>
          Label text
        </Typography>
        <input id={id} type={'text'} />
      </div>
    )
  },
}
