import { TabItem, Tabs } from '@/shared/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Tabs> = {
  args: {
    defaultValue: 'tab1',
    tabs: [
      { content: <p>Content for Tab 1</p>, label: 'Tab 1', value: 'tab1' },
      { content: <p>Content for Tab 2</p>, label: 'Tab 2', value: 'tab2' },
      { content: <p>Content for Tab 3</p>, label: 'Tab 3', value: 'tab3' },
    ] as TabItem[],
  },
  component: Tabs,
  tags: ['autodocs'],
  title: 'UI/Tabs',
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const TabsInDiv: Story = {
  render: args => (
    <div style={{ width: '250px' }}>
      <Tabs {...args} />
    </div>
  ),
}
