import { Button, Card } from '@/shared/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Card> = {
  component: Card,
  tags: ['autodocs'],
  title: 'UI/Card',
}

export default meta

type Story = StoryObj<typeof meta>

export const BaseCard: Story = {
  args: {
    children: (
      <>
        <p>
          By default, the BaseCard has `border`, `background-color`, and is full-width with zero
          padding (`padding: 0`).
        </p>
        <ul>
          <li>
            To limit the width of Card but make it responsive use `max-width` fir element or
            container
          </li>
          <li>Or use one of variants</li>
        </ul>
      </>
    ),
  },
}

export const AuthCard: Story = {
  render: () => {
    return (
      <Card className={'space-y-6 mx-auto flex flex-col items-center'} variant={'auth'}>
        <p>Auth Variant Card</p>
        <p>Auth Variant Card</p>
        <p>Auth Variant Card</p>
        <Button>Submit</Button>
      </Card>
    )
  },
}

export const DevicesCard: Story = {
  render: () => {
    return (
      <Card className={'flex justify-between'} variant={'devices'}>
        <div className={'border border-red-500'}>Content</div>
        <div className={'border border-red-500'}>Content</div>
      </Card>
    )
  },
}

export const GraphCard: Story = {
  render: () => {
    return (
      <Card variant={'graph'}>
        <div className={'h-40 border border-red-500'}>Content</div>
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
      <Card asChild className={'space-y-6 max-w-[378px] mx-auto'} variant={'auth'}>
        <article>
          <p>As `article` component</p>
          <Button className={'w-full'}>Submit</Button>
        </article>
      </Card>
    )
  },
}
