import { Card } from '@/shared/card/card'
import { Button } from '@/shared/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Card> = {
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Card',
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithContent: Story = {
  render: () => {
    return (
      <Card className={'space-y-6'}>
        <span>Some text</span>
        <span>Some text</span>
        <span>Some text</span>
        <Button>Submit</Button>
      </Card>
    )
  },
}
