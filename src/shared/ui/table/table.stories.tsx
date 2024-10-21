import { TableBody, TableCell, TableHead, TableRoot, TableRow } from '@/shared/ui'
import { StoryObj } from '@storybook/react'

const meta = {
  title: 'UI/Table',
}

export default meta
type Story = StoryObj<typeof meta>

const tableData = [
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
]

export const Default: Story = {
  render: () => {
    return (
      <TableRoot className={'w-full text-left'}>
        <TableHead>
          <TableRow isHeader>
            <TableCell>Date of Payment</TableCell>
            <TableCell>End date of subscription</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Subscription Type</TableCell>
            <TableCell>Payment Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((data, index) => (
            <TableRow key={index}>
              <TableCell>{new Date(data.dateOfPayment).toLocaleDateString('ru-RU')}</TableCell>
              <TableCell>{new Date(data.endDateOfPayment).toLocaleDateString('ru-RU')}</TableCell>
              <TableCell>{`$${data.price}`}</TableCell>
              <TableCell>{data.subscriptionType}</TableCell>
              <TableCell>{data.paymentType}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    )
  },
}
