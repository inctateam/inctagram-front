import type { Meta, StoryObj } from '@storybook/react'

import { Button, Popover, PopoverContent, PopoverTrigger } from '@/shared/ui'

const meta = {
  component: Popover,
  tags: ['autodocs'],
  title: 'UI/Popover',
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={'outline'}>Open popover</Button>
        </PopoverTrigger>
        <PopoverContent className={'max-w-[500px]'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </PopoverContent>
      </Popover>
    )
  },
}
