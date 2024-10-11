import type { Meta, StoryObj } from '@storybook/react'

import {
  Bell,
  BellOutline,
  Email,
  EmailOutline,
  Heart,
  HeartOutline,
} from '@/assets/icons/components'
import { Badge } from '@/shared/ui'

const meta = {
  argTypes: {
    badgeContent: {
      control: {
        type: 'number',
      },
    },
  },
  component: Badge,
  tags: ['autodocs'],
  title: 'UI/Badge',
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultBellBadge: Story = {
  args: {
    badgeContent: 1,
    children: <Bell />,
  },
  render: args => {
    return (
      <Badge badgeContent={args.badgeContent}>
        <Bell />
      </Badge>
    )
  },
}
export const BellOutlineBadge: Story = {
  args: {
    badgeContent: 1,
    children: <BellOutline />,
  },
  render: args => {
    return (
      <Badge badgeContent={args.badgeContent}>
        <BellOutline />
      </Badge>
    )
  },
}

export const HeartBadge: Story = {
  args: {
    badgeContent: 10,
    children: <Heart />,
  },
  render: args => {
    return (
      <Badge badgeContent={args.badgeContent}>
        <Heart />
      </Badge>
    )
  },
}
export const HeartOutlineBadge: Story = {
  args: {
    badgeContent: 10,
    children: <HeartOutline />,
  },
  render: args => {
    return (
      <Badge badgeContent={args.badgeContent}>
        <HeartOutline />
      </Badge>
    )
  },
}

export const EmailBadge: Story = {
  args: {
    badgeContent: 100,
    children: <Email />,
  },
  render: args => {
    return (
      <Badge badgeContent={args.badgeContent}>
        <Email />
      </Badge>
    )
  },
}
export const EmailOutlineBadge: Story = {
  args: {
    badgeContent: 100,
    children: <EmailOutline />,
  },
  render: args => {
    return (
      <Badge badgeContent={args.badgeContent}>
        <EmailOutline />
      </Badge>
    )
  },
}
