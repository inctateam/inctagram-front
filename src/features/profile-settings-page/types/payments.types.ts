export interface PaymentsDataResponse {
  dateOfPayment: string
  endDateOfPayment: string
  paymentType: string
  price: number
  subscriptionType: string
}
// Определение Enum
enum SubscriptionType {
  DAY = 'DAY',
  MONTHLY = 'MONTHLY',
  WEEKLY = 'WEEKLY',
}
enum PaymentType {
  DAY = 'DAY',
  MONTHLY = 'MONTHLY',
  WEEKLY = 'WEEKLY',
}
interface PaymentResponsse {
  dateOfPayment: string
  endDateOfSubscription: string
  paymentType: PaymentType
  price: 0
  subscriptionId: string
  subscriptionType: SubscriptionType
  userId: number
}
