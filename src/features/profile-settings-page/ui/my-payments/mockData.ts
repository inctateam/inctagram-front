import { PaymentsDataResponse } from '@/features/profile-settings-page/types/payments.types'
import { Nullable } from '@/shared/types'

export const paymentData: Nullable<PaymentsDataResponse[]> = [
  {
    dateOfPayment: '2025-03-09T16:30:25.636Z',
    endDateOfPayment: '2025-03-10T16:30:25.636Z',
    paymentType: 'PayPal',
    price: 20,
    subscriptionType: '1 day',
  },
  {
    dateOfPayment: '2025-02-11T16:30:25.636Z',
    endDateOfPayment: '2025-03-11T16:30:25.636Z',
    paymentType: 'PayPal',
    price: 10,
    subscriptionType: '30 days',
  },
  {
    dateOfPayment: '2025-03-10T16:30:25.636Z',
    endDateOfPayment: '2025-03-10T16:30:25.636Z',
    paymentType: 'Stripe',
    price: 200,
    subscriptionType: '33 days',
  },
  {
    dateOfPayment: '2025-03-08T16:30:25.636Z',
    endDateOfPayment: '2025-03-10T16:30:25.636Z',
    paymentType: 'Stripe',
    price: 50,
    subscriptionType: '100 days',
  },
  {
    dateOfPayment: '2025-03-10T16:30:25.636Z',
    endDateOfPayment: '2025-03-10T16:30:25.636Z',
    paymentType: 'PayPal',
    price: 20,
    subscriptionType: '1 days',
  },
  {
    dateOfPayment: '2025-03-09T16:30:25.636Z',
    endDateOfPayment: '2025-03-10T16:30:25.636Z',
    paymentType: 'PayPal',
    price: 10,
    subscriptionType: '10 days',
  },
  {
    dateOfPayment: '2025-01-07T16:30:25.636Z',
    endDateOfPayment: '2025-04-07T16:30:25.636Z',
    paymentType: 'Stripe',
    price: 200,
    subscriptionType: '100 days',
  },
  {
    dateOfPayment: '2025-01-10T16:30:25.636Z',
    endDateOfPayment: '2025-05-10T16:30:25.636Z',
    paymentType: 'Stripe',
    price: 50,
    subscriptionType: '100 days',
  },
  {
    dateOfPayment: '2025-02-10T16:30:25.636Z',
    endDateOfPayment: '2025-05-10T16:30:25.636Z',
    paymentType: 'PayPal',
    price: 20,
    subscriptionType: '1 day',
  },
  {
    dateOfPayment: '2025-03-10T16:30:25.636Z',
    endDateOfPayment: '2025-04-10T16:30:25.636Z',
    paymentType: 'PayPal',
    price: 10,
    subscriptionType: '10 days',
  },
  {
    dateOfPayment: '2025-03-10T16:30:25.636Z',
    endDateOfPayment: '2025-03-10T16:30:25.636Z',
    paymentType: 'Stripe',
    price: 200,
    subscriptionType: '100 days',
  },
  {
    dateOfPayment: '2025-03-10T16:30:25.636Z',
    endDateOfPayment: '2025-04-10T16:30:25.636Z',
    paymentType: 'Stripe',
    price: 50,
    subscriptionType: '100 days',
  },
]
