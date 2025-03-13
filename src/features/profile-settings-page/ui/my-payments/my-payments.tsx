import { useGetMyPaymentsQuery } from '@/features/profile-settings-page/api/subscriptions.api'
import { MyPayment, PaymentType } from '@/features/profile-settings-page/types'
import usePaymentsPagination from '@/shared/hooks/usePaymentsPagination'
import {
  Pagination,
  ProgressBar,
  TableBody,
  TableCell,
  TableHead,
  TableRoot,
  TableRow,
} from '@/shared/ui'
import { useTranslations } from 'next-intl'

const MyPayments = () => {
  const t = useTranslations('ProfileSettings.MyPayments')
  const { data: paymentsData, isLoading } = useGetMyPaymentsQuery()
  const {
    currentDataOnPage,
    currentPage,
    formatSubscriptionDuration,
    itemsPerPage,
    onChangeItemsPerPageHandler,
    onCurrentPageClickHandler,
    onSortChangeHandler,
    sortKey,
    sortOrder,
    totalItems,
    totalPages,
  } = usePaymentsPagination(paymentsData)

  const getSortIndicator = (key: keyof MyPayment) => {
    if (sortKey === key) {
      return sortOrder === 'asc' ? ' ↑' : ' ↓'
    }

    return ''
  }

  const formatPaymentType = (paymentType: PaymentType): string => {
    return paymentType.charAt(0).toUpperCase() + paymentType.slice(1).toLowerCase()
  }

  if (isLoading) {
    return <ProgressBar />
  }

  return (
    <div
      className={
        'flex items-start flex-col w-full gap-9 mt-6 justify-between h-[38rem] overflow-y-auto'
      }
    >
      <div className={'h-[28rem] overflow-y-auto w-full flex-1'}>
        <TableRoot className={'w-full relative'}>
          <TableHead className={'sticky top-0'}>
            <TableRow>
              <TableCell
                className={'cursor-pointer'}
                onClick={() => onSortChangeHandler('dateOfPayment')}
              >
                {t('dateOfPayment')}
                {getSortIndicator('dateOfPayment')}
              </TableCell>
              <TableCell
                className={'cursor-pointer'}
                onClick={() => onSortChangeHandler('endDateOfSubscription')}
              >
                {t('endDateOfSubscription')}
                {getSortIndicator('endDateOfSubscription')}
              </TableCell>
              <TableCell className={'cursor-pointer'} onClick={() => onSortChangeHandler('price')}>
                {t('price')}
                {getSortIndicator('price')}
              </TableCell>
              <TableCell
                className={'cursor-pointer'}
                onClick={() => onSortChangeHandler('subscriptionType')}
              >
                {t('subscriptionType')}
                {getSortIndicator('subscriptionType')}
              </TableCell>
              <TableCell
                className={'cursor-pointer'}
                onClick={() => onSortChangeHandler('paymentType')}
              >
                {t('paymentType')}
                {getSortIndicator('paymentType')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentDataOnPage.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(data.dateOfPayment).toLocaleDateString('ru-RU')}</TableCell>
                <TableCell>
                  {new Date(data.endDateOfSubscription).toLocaleDateString('ru-RU')}
                </TableCell>
                <TableCell>{`$${data.price}`}</TableCell>
                <TableCell>{formatSubscriptionDuration(data.subscriptionType)}</TableCell>
                <TableCell>{formatPaymentType(data.paymentType)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableRoot>
      </div>
      <Pagination
        currentPage={currentPage}
        initialItemsPerPage={itemsPerPage}
        onChangeItemsPerPageHandler={onChangeItemsPerPageHandler}
        onCurrentPageClickHandler={onCurrentPageClickHandler}
        totalItems={totalItems}
        totalPages={totalPages}
      />
    </div>
  )
}

export { MyPayments }
