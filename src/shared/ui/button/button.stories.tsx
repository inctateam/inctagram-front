import type { Meta, StoryObj } from '@storybook/react'

import { LogOutOutline } from '@/assets/icons'
import { Button } from '@/shared/ui'

const meta = {
  component: Button,
  tags: ['autodocs'],
  title: 'UI/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const AllButtons: Story = {
  render: () => {
    return (
      <div className={'flex gap-5'}>
        <div className={'inline-flex gap-5 flex-col'}>
          <Button>Primary</Button>
          <Button disabled>Disabled</Button>
          <Button size={'large'}>Large</Button>
        </div>

        <div className={'inline-flex gap-5 flex-col'}>
          <Button variant={'secondary'}>Secondary</Button>
          <Button disabled variant={'secondary'}>
            Disabled
          </Button>
          <Button size={'large'} variant={'secondary'}>
            Large
          </Button>
        </div>

        <div className={'inline-flex gap-5 flex-col'}>
          <Button variant={'outline'}>Outline</Button>
          <Button disabled variant={'outline'}>
            Disabled
          </Button>
          <Button size={'large'} variant={'outline'}>
            Large
          </Button>
        </div>

        <div className={'inline-flex gap-5 flex-col'}>
          <Button variant={'text'}>Text</Button>
          <Button disabled variant={'text'}>
            Disabled
          </Button>
          <Button size={'large'} variant={'text'}>
            Large
          </Button>
        </div>
      </div>
    )
  },
}

export const FullWidth = {
  render: () => {
    return (
      <div className={'inline-flex flex-col w-3/6 space-y-4'}>
        <Button className={'w-full'}>Primary</Button>
        <Button className={'w-full'} variant={'secondary'}>
          Secondary
        </Button>
        <Button className={'w-full'} variant={'outline'}>
          Outline
        </Button>
        <Button className={'w-full'} variant={'text'}>
          Text
        </Button>
      </div>
    )
  },
}

export const AsLink = {
  render: () => {
    return (
      <Button asChild>
        <a href={'https://google.com'} rel={'noreferrer noopener'} target={'_blank'}>
          Go to Google
        </a>
      </Button>
    )
  },
}

export const WithStartIcon = {
  render: () => {
    return <Button startIcon={<LogOutOutline />}>Logout</Button>
  },
}

export const WithEndIcon = {
  render: () => {
    return <Button endIcon={<LogOutOutline />}>Logout</Button>
  },
}
