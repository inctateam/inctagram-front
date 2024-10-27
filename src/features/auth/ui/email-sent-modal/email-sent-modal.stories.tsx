import { EmailSentModal } from '@/features/auth/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: EmailSentModal,
  title: 'Modals/Email Sent Modal',
} satisfies Meta<typeof EmailSentModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { onOpenChange: () => {}, open: true, userEmail: 'test@gmail.com' },
}
