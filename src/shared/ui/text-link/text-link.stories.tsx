import type { Meta, StoryObj } from '@storybook/react'

import { LogOutOutline } from '@/assets/icons'
import { TextLink } from '@/shared/ui'

const meta = {
  component: TextLink,
  tags: ['autodocs'],
  title: 'UI/TextLink',
} satisfies Meta<typeof TextLink>

export default meta
type Story = StoryObj<typeof meta>

export const Size: Story = {
  args: {
    href: '',
  },
  render: () => {
    return (
      <div>
        <div>
          <TextLink href={'/sign-up'}>size=medium (default)</TextLink>
        </div>
        <div>
          <TextLink href={'/sign-up'} size={'small'}>
            size=small
          </TextLink>
        </div>
      </div>
    )
  },
}

export const Color: Story = {
  args: {
    href: '',
  },
  render: () => {
    return (
      <div>
        <div>
          <TextLink href={'/sign-up'}>color=primary (default)</TextLink>
        </div>
        <div>
          <TextLink color={'regular'} href={'/sign-up'}>
            color=regular
          </TextLink>
        </div>
      </div>
    )
  },
}

export const Underline: Story = {
  args: {
    href: '',
  },
  render: () => {
    return (
      <div>
        <div>
          <TextLink href={'/sign-up'}>underline=true (default)</TextLink>
        </div>
        <div>
          <TextLink href={'/sign-up'} underline={false}>
            underline=false
          </TextLink>
        </div>
      </div>
    )
  },
}

export const Polymorphic: Story = {
  args: {
    href: '',
  },
  render: () => {
    return (
      <TextLink asChild href={'https://google.com'} rel={'noreferrer'} target={'_blank'}>
        <a>Regular `a` tag - external link</a>
      </TextLink>
    )
  },
}

export const WithIcon: Story = {
  args: {
    href: '',
  },
  render: () => {
    return (
      <TextLink className={'font-medium'} color={'regular'} href={'/login'} underline={false}>
        <LogOutOutline className={'text-2xl mr-3'} />
        Log Out
      </TextLink>
    )
  },
}
