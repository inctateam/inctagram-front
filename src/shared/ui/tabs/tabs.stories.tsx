import { Tabs, TabsContent, TabsList, TabsTrigger, Typography } from '@/shared/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Tabs> = {
  args: {
    defaultValue: 'tab1',
  },
  component: Tabs,
  tags: ['autodocs'],
  title: 'UI/Tabs',
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const TabsInDiv: Story = {
  render: () => (
    <div style={{ width: '250px' }}>
      <Tabs defaultValue={'tab1'}>
        <TabsList>
          <TabsTrigger value={'tab1'}>Tab1</TabsTrigger>
          <TabsTrigger value={'tab2'}>Tab2</TabsTrigger>
          <TabsTrigger value={'tab3'}>Tab3</TabsTrigger>
        </TabsList>
        <TabsContent value={'tab1'}>
          <Typography>tab1 content</Typography>
        </TabsContent>

        <TabsContent value={'tab2'}>
          <Typography>tab2 content</Typography>
        </TabsContent>

        <TabsContent value={'tab3'}>
          <Typography>tab3 content</Typography>
        </TabsContent>
      </Tabs>
    </div>
  ),
}
