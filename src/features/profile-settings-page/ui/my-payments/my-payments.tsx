import { Nullable } from '@/shared/types'
import { Pagination, TableBody, TableCell, TableHead, TableRoot, TableRow } from '@/shared/ui'
type PaymentsDataType = {
  dateOfPayment: string
  endDateOfPayment: string
  paymentType: string
  price: number
  subscriptionType: string
}
const MyPayments = () => {
  const paymentData: Nullable<PaymentsDataType[]> = [
    {
      dateOfPayment: '02.02.2023',
      endDateOfPayment: '02.02.2024',
      paymentType: 'PayPal',
      price: 20,
      subscriptionType: '1 day',
    },
    {
      dateOfPayment: '02.02.2023',
      endDateOfPayment: '02.02.2024',
      paymentType: 'PayPal',
      price: 10,
      subscriptionType: '12 days',
    },
    {
      dateOfPayment: '02.02.2023',
      endDateOfPayment: '02.02.2024',
      paymentType: 'Stripe',
      price: 200,
      subscriptionType: '33 days',
    },
    {
      dateOfPayment: '02.02.2023',
      endDateOfPayment: '02.02.2024',
      paymentType: 'Stripe',
      price: 50,
      subscriptionType: '100 days',
    },
    {
      dateOfPayment: '02.02.2023',
      endDateOfPayment: '02.02.2024',
      paymentType: 'PayPal',
      price: 20,
      subscriptionType: '1 days',
    },
    {
      dateOfPayment: '02.02.2023',
      endDateOfPayment: '02.02.2024',
      paymentType: 'PayPal',
      price: 10,
      subscriptionType: '10 days',
    },
    {
      dateOfPayment: '02.02.2023',
      endDateOfPayment: '02.02.2024',
      paymentType: 'Stripe',
      price: 200,
      subscriptionType: '100 days',
    },
    {
      dateOfPayment: '02.02.2023',
      endDateOfPayment: '02.02.2024',
      paymentType: 'Stripe',
      price: 50,
      subscriptionType: '100 days',
    },
    {
      dateOfPayment: '02.02.2023',
      endDateOfPayment: '02.02.2024',
      paymentType: 'PayPal',
      price: 20,
      subscriptionType: '1 day',
    },
    {
      dateOfPayment: '02.02.2023',
      endDateOfPayment: '02.02.2024',
      paymentType: 'PayPal',
      price: 10,
      subscriptionType: '10 days',
    },
    // {
    //   dateOfPayment: '02.02.2023',
    //   endDateOfPayment: '02.02.2024',
    //   paymentType: 'Stripe',
    //   price: 200,
    //   subscriptionType: '100 days',
    // },
    // {
    //   dateOfPayment: '02.02.2023',
    //   endDateOfPayment: '02.02.2024',
    //   paymentType: 'Stripe',
    //   price: 50,
    //   subscriptionType: '100 days',
    // },
  ]

  return (
    <div className={'flex items-start flex-col w-full gap-9 mt-6'}>
      <TableRoot className={'w-full'}>
        <TableHead>
          <TableRow>
            <TableCell>Date of Payment</TableCell>
            <TableCell>End date of subscription</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Subscription Type</TableCell>
            <TableCell>Payment Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paymentData &&
            paymentData.map((data, index) => (
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
      <Pagination initialItemsPerPage={10} totalItems={100} />
    </div>
  )
}

export { MyPayments }
