import { Tabs } from '@/shared/ui/tabs'

const tabsData = [
  {
    content: 'Content for Tab 1',
    disabled: false,
    isActive: false,
    isFocused: false,
    label: 'Tab 1',
    value: 'tab1',
  },
  {
    content: 'Content for Tab 2',
    disabled: false,
    isActive: false,
    isFocused: false,
    label: 'Tab 2',
    value: 'tab2',
  },
  {
    content: 'Content for Tab 3',
    disabled: false,
    isActive: false,
    isFocused: false,
    label: 'Tab 3',
    value: 'tab3',
  },
]

export default function Home() {
  return (
    <>
      <div>Hello</div>
      <Tabs tabs={tabsData} value={'tab1'} variant={'primary'}>
        <div>Content for Tab 1</div>
      </Tabs>
    </>
  )
}
