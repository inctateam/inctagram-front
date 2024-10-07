import { Button, Card } from '@/shared/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Card> = {
  component: Card,
  tags: ['autodocs'],
  title: 'UI/Card',
}

export default meta

type Story = StoryObj<typeof meta>

export const Base: Story = {
  args: {
    children: (
      <>
        <p>Card is fullwidth by default and zero padding (`padding: 0`).</p>
        <ul>
          <li>Use `max-width` to limit the width of Card but make it responsive</li>
          <li>Or use `max-width` (`width`) for container element</li>
        </ul>
      </>
    ),
  },
}

export const AuthCard: Story = {
  render: () => {
    return (
      <Card className={'space-y-6 mx-auto'} variant={'authCard'}>
        <p>Auth Variant Card</p>
        <p>Auth Variant Card</p>
        <p>Auth Variant Card</p>
        <Button className={'w-full'}>Submit</Button>
      </Card>
    )
  },
}

export const LimitWithMaxWidth: Story = {
  render: () => {
    return (
      <Card className={'space-y-6 max-w-[600px] mx-auto p-6'}>
        <p>Some text</p>
        <p>Some text</p>
        <p>Some text</p>
        <Button className={'w-full'}>Submit</Button>
      </Card>
    )
  },
}

export const Polymorphic: Story = {
  render: () => {
    return (
      <Card asChild className={'space-y-6 max-w-[378px] mx-auto p-6'}>
        <span>
          <p>As `span` component</p>
          <Button className={'w-full'}>Submit</Button>
        </span>
      </Card>
    )
  },
}
