export interface CreateSubscriptionResponse {
  url: string
}
export interface CurrentPaymentSubscriptionResponse {
  data: CurrentSubscription[]
  hasAutoRenewal: boolean
}
export interface PaymentCostSubscriptionsResponse {
  data: SubscriptionCost[]
}

export type MyPaymentsResponse = MyPayment[]
export interface MyPayment {
  dateOfPayment: string
  endDateOfSubscription: string
  price: number
  subscriptionId: string
  subscriptionType: SubscriptionType
  userId: number
}
export interface CurrentSubscription {
  autoRenewal: boolean
  dateOfPayment: string
  endDateOfSubscription: string
  subscriptionId: string
  userId: number
}

interface SubscriptionCost {
  amount: number
  typeDescription: SubscriptionType
}

export interface SubscriptionData {
  amount: number
  baseUrl: string
  paymentType: PaymentType
  typeSubscription: SubscriptionType
}

export enum PaymentType {
  PAYPAL = 'PAYPAL',
  STRIPE = 'STRIPE',
}

export enum SubscriptionType {
  DAY = 'DAY',
  MONTHLY = 'MONTHLY',
  WEEKLY = 'WEEKLY',
}
