import { Table } from '@/shared/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Table> = {
  argTypes: {
    data: {
      control: false,
    },
  },
  component: Table,
  title: 'UI/Table',
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: [
      {
        dateOfPayment: '12.12.2022',
        endDateOfPayment: '12.12.2023',
        paymentType: 'Stripe',
        price: 10,
        subscriptionType: '1 day',
      },
      {
        dateOfPayment: '12.12.2022',
        endDateOfPayment: '12.12.2022',
        paymentType: 'Stripe',
        price: 50,
        subscriptionType: '7 days',
      },
      {
        dateOfPayment: '12.12.2022',
        endDateOfPayment: '12.12.2022',
        paymentType: 'Stripe',
        price: 100,
        subscriptionType: '1 month',
      },
      {
        dateOfPayment: '12.12.2022',
        endDateOfPayment: '12.12.2022',
        paymentType: 'PayPal',
        price: 100,
        subscriptionType: '1 month',
      },
      {
        dateOfPayment: '12.12.2022',
        endDateOfPayment: '12.12.2022',
        paymentType: 'PayPal',
        price: 50,
        subscriptionType: '7 days',
      },
    ],
  },
}
