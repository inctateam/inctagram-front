import { Meta, StoryObj } from '@storybook/react'

import { ScrollArea } from './scrollbar' // Путь к вашему компоненту

const meta: Meta<typeof ScrollArea> = {
  args: {},
  component: ScrollArea,
  title: 'UI/ScrollArea',
}

export default meta

type Story = StoryObj<typeof meta>

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: args => (
    <ScrollArea
      className={'h-[350px] w-[200px] rounded-md border p-4'}
      orientation={args.orientation}
    >
      <div style={{ height: '600px' }}>
        Jokester began sneaking into the castle in the middle of the night and leaving jokes all
        over the place: under the kings pillow, in his soup, even in the royal toilet. The king was
        furious, but he couldnt seem to stop Jokester. And then, one day, the people of the kingdom
        discovered that the jokes left by Jokester were so funny that they couldnt help but laugh.
        And once they started laughing, they couldnt stop.
      </div>
    </ScrollArea>
  ),
}

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: args => (
    <ScrollArea
      className={'h-[200px] w-[150px] rounded-md border p-4'}
      orientation={args.orientation}
    >
      <div style={{ whiteSpace: 'nowrap', width: '600px' }}>
        Jokester began sneaking into the castle in the middle of the night and leaving jokes all
        over the place: under the kings pillow, in his soup, even in the royal toilet. The king was
        furious, but he couldnt seem to stop Jokester. And then, one day, the people of the kingdom
        discovered that the jokes left by Jokester were so funny that they couldnt help but laugh.
        And once they started laughing, they couldnt stop.
      </div>
    </ScrollArea>
  ),
}
