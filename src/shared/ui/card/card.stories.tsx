import { Button, Card } from '@/shared/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Card> = {
  component: Card,
  tags: ['autodocs'],
  title: 'UI/Card',
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <p>default Card component includes colors and borders</p>
        <p>variants add paddings, size and flex</p>
        <p>variants usage:</p>
        <ul>
          <li>auth - for authorization forms</li>
          <li>graph - for statistics page</li>
          <li>devices - for profile devices tab</li>
        </ul>
      </>
    ),
  },
}

export const AuthCard: Story = {
  render: () => {
    return (
      <Card className={'space-y-6'} variant={'auth'}>
        <p>Some text</p>
        <p>Some text</p>
        <p>Some text</p>
        <Button className={'w-full'}>Submit</Button>
      </Card>
    )
  },
}

export const GraphCard: Story = {
  render: () => {
    return (
      <Card variant={'graph'}>
        <div className={'w-full h-full border border-red-500'}>Content</div>
      </Card>
    )
  },
}

export const DevicesCard: Story = {
  render: () => {
    return (
      <Card variant={'devices'}>
        <div className={'border border-red-500 flex-'}>Content</div>
        <div className={'border border-red-500'}>Content</div>
      </Card>
    )
  },
}

export const PolymorphicAsSpan: Story = {
  render: () => {
    return (
      <Card asChild className={'space-y-6 max-w-[378px] mx-auto p-6 flex flex-col items-center'}>
        <span>
          <p>Some text</p>
          <p>Some text</p>
          <p>Some text</p>
          <Button className={'w-full'}>Submit</Button>
        </span>
      </Card>
    )
  },
}
