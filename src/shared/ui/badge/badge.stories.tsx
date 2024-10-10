import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import {
  Bell,
  BellOutline,
  Email,
  EmailOutline,
  Heart,
  HeartOutline,
} from '@/assets/icons/components'
import { Badge } from '@/shared/ui/badge/badge'

const meta = {
  component: Badge,
  tags: ['autodocs'],
  title: 'UI/Badge',
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultBadge: Story = {
  args: {
    badgeContent: 0,
    children: <Bell />,
  },
  render: args => {
    const [count, setCount] = useState(args.badgeContent)

    return (
      <div
        className={'flex gap-3'}
        onClick={() => {
          setCount(count + 1)
        }}
      >
        <Badge badgeContent={count}>
          <Bell />
        </Badge>
        <Badge badgeContent={count}>
          <BellOutline />
        </Badge>
        <Badge badgeContent={count}>
          <Heart />
        </Badge>
        <Badge badgeContent={count}>
          <HeartOutline />
        </Badge>
        <Badge badgeContent={count}>
          <Email />
        </Badge>
        <Badge badgeContent={count}>
          <EmailOutline />
        </Badge>
      </div>
    )
  },
}
