import { PaymentsDataResponse } from '@/features/profile-settings-page/types/payments.types'
import { instagramApi } from '@/services'

export const paymentsApi = instagramApi.injectEndpoints({
  endpoints: builder => ({
    getPayments: builder.query<PaymentsDataResponse[], void>({
      query: () => ({
        url: `v1/subscriptions/my-payments`,
      }),
    }),
  }),
})
export const { useGetPaymentsQuery } = paymentsApi
