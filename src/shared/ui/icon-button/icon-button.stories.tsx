import type { Meta, StoryObj } from '@storybook/react'

import { Eye, GithubLogo, GoogleLogo } from '@/assets/icons'
import { IconButton } from '@/shared/ui'

const meta = {
  component: IconButton,
  tags: ['autodocs'],
  title: 'UI/IconButton',
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return (
      <div>
        <IconButton size={'medium'}>
          <Eye />
        </IconButton>

        <IconButton color={'primary'} size={'medium'}>
          <Eye />
        </IconButton>
      </div>
    )
  },
}

export const Focused: Story = {
  render: () => {
    return (
      <div>
        <IconButton autoFocus size={'medium'}>
          <Eye />
        </IconButton>
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => {
    return (
      <div>
        <IconButton disabled size={'medium'}>
          <Eye />
        </IconButton>

        <IconButton color={'primary'} disabled size={'medium'}>
          <Eye />
        </IconButton>
      </div>
    )
  },
}

export const Sizes: Story = {
  render: () => {
    return (
      <>
        <div className={'flex flex-col gap-4'}>
          <div className={'flex items-center min-h-[40px]'}>
            <span className={'w-[200px]'}>small size = 16px</span>

            <IconButton size={'small'}>
              <Eye />
            </IconButton>
          </div>
          <div className={'flex items-center min-h-[40px]'}>
            <span className={'w-[200px]'}>medium size = 24px</span>

            <IconButton size={'medium'}>
              <Eye />
            </IconButton>
          </div>
          <div className={'flex items-center min-h-[40px]'}>
            <span className={'w-[200px]'}>custom size - the first approach</span>

            <IconButton className={'text-[30px]'}>
              <Eye />
            </IconButton>
          </div>
          <div className={'flex items-center min-h-[40px]'}>
            <span className={'w-[200px]'}>custom size - the second approach</span>

            <IconButton>
              <Eye className={'text-[36px]'} />
            </IconButton>
          </div>
        </div>
      </>
    )
  },
}

export const ExtendsFromBase: Story = {
  render: () => {
    return (
      <IconButton className={'text-4xl'} size={'default'}>
        <GithubLogo />
      </IconButton>
    )
  },
}

export const PolymorphicAsChild: Story = {
  render: () => {
    return (
      <IconButton asChild className={'text-4xl'} size={'default'}>
        <a href={'https://google.com'} rel={'noreferrer'} target={'_blank'}>
          <GoogleLogo />
        </a>
      </IconButton>
    )
  },
}
