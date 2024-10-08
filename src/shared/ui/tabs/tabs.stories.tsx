import { Meta, StoryObj } from '@storybook/react'

import { Tabs } from './tabs'

const meta: Meta<typeof Tabs> = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
  },
  args: {},
  component: Tabs,
  tags: ['autodocs'],
  title: 'UI/Tabs',
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 'Tabs',
  },
}

export const Active: Story = {
  args: {
    isActive: true,
    value: 'Tabs',
  },
}

export const Focus: Story = {
  args: {
    isFocused: true,
    value: 'Tabs',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Tabs',
  },
}
// // Добавляем истории для TabsList
// const tabsListMeta: Meta<typeof TabsList> = {
//   argTypes: {
//     variant: {
//       control: { type: 'radio' },
//       options: ['primary', 'secondary'],
//     },
//   },
//   args: {},
//   component: TabsList,
//   tags: ['autodocs'],
//   title: 'UI/TabsList',
// }

// type TabItem = {
//   content: ReactNode
//   disabled?: boolean
//   isActive?: boolean
//   isFocused?: boolean
//   label: string
//   value: string
// }

// type TabsListStory = {
//   args: {
//     tabs: TabItem[]
//   }
// } & StoryObj<typeof tabsListMeta>

// const tabsData = [
//   {
//     content: 'Content for Tab 1',
//     disabled: false,
//     isActive: false,
//     isFocused: false,
//     label: 'Tab 1',
//     value: 'tab1',
//   },
//   {
//     content: 'Content for Tab 2',
//     disabled: false,
//     isActive: false,
//     isFocused: false,
//     label: 'Tab 2',
//     value: 'tab2',
//   },
//   {
//     content: 'Content for Tab 3',
//     disabled: false,
//     isActive: false,
//     isFocused: false,
//     label: 'Tab 3',
//     value: 'tab3',
//   },
// ]

// export const TabsListPrimary: TabsListStory = {
//   args: {
//     tabs: tabsData,
//     variant: 'primary',
//   },
// }
