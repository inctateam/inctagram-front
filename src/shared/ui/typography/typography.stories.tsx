import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from '@/shared/ui'

const meta = {
  component: Typography,
  title: 'UI/Typography',
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

const text = 'Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH'

export const AllVariant: Story = {
  render: () => {
    return (
      <div className={'flex flex-col gap-4'}>
        <Typography variant={'large'}>large - {text}</Typography>
        <Typography variant={'h1'}>h1 - {text}</Typography>
        <Typography variant={'h2'}>h2 - {text}</Typography>
        <Typography variant={'h3'}>h3 - {text}</Typography>
        <Typography variant={'regular16'}>regular16 - {text}</Typography>
        <Typography variant={'bold16'}>bold16 - {text}</Typography>
        <Typography variant={'regular14'}>regular14 - {text}</Typography>
        <Typography variant={'medium14'}>medium14 - {text}</Typography>
        <Typography variant={'bold14'}>bold14 - {text}</Typography>
        <Typography variant={'small'}>small - {text}</Typography>
        <Typography variant={'semiSmall'}>semiSmall - {text}</Typography>
      </div>
    )
  },
}

export const Polymorphic: Story = {
  args: {
    as: 'span',
    children: '`span` element with `h1` styles',
    variant: 'h1',
  },
}
