import { instagramApi } from '@/services'

import {
  CreateSubscriptionResponse,
  CurrentPaymentSubscriptionResponse,
  MyPaymentsResponse,
  PaymentCostSubscriptionsResponse,
  SubscriptionData,
} from '../types/subscriptions.types'

export const subscriptionsApi = instagramApi.injectEndpoints({
  endpoints: builder => ({
    cancelAutoRenewal: builder.mutation<void, void>({
      query: () => ({
        method: 'POST',
        url: 'v1/subscriptions/canceled-auto-renewal',
      }),
    }),
    createSubscription: builder.mutation<CreateSubscriptionResponse, SubscriptionData>({
      query: (subscriptionData: SubscriptionData) => ({
        body: subscriptionData,
        method: 'POST',
        url: 'v1/subscriptions',
      }),
    }),
    getCurrentSubscriptions: builder.query<CurrentPaymentSubscriptionResponse, void>({
      query: () => ({
        method: 'GET',
        url: 'v1/subscriptions/current-payment-subscriptions',
      }),
    }),
    getMyPayments: builder.query<MyPaymentsResponse, void>({
      query: () => ({
        method: 'GET',
        url: 'v1/subscriptions/my-payments',
      }),
    }),
    getPaymentCostSubscriptions: builder.query<PaymentCostSubscriptionsResponse, void>({
      query: () => ({
        method: 'GET',
        url: 'v1/subscriptions/cost-of-payment-subscriptions',
      }),
    }),
  }),
})

export const {
  useCancelAutoRenewalMutation,
  useCreateSubscriptionMutation,
  useGetCurrentSubscriptionsQuery,
  useGetMyPaymentsQuery,
  useGetPaymentCostSubscriptionsQuery,
} = subscriptionsApi
