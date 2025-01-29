import { LOCALES, LOCALES_NAMES } from '@/i18n/i18n.config'
import { Select, SelectItem, SelectProps } from '@/shared/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Select> = {
  args: {},
  component: Select,
  tags: ['autodocs'],
  title: 'UI/Select',
}

export default meta

type Story = StoryObj<typeof meta>

const currentLocale = 'en'
const SELECT = (props: SelectProps) => (
  <Select defaultValue={currentLocale} {...props}>
    {LOCALES.map(loc => (
      <SelectItem key={loc} value={loc}>
        {LOCALES_NAMES[loc]}
      </SelectItem>
    ))}
  </Select>
)

export const Default: Story = {
  render: () => {
    return <SELECT />
  },
}

export const Disabled: Story = {
  render: () => {
    return <SELECT disabled />
  },
}
