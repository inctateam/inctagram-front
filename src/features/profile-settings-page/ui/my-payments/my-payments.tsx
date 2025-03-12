import { paymentData } from '@/features/profile-settings-page/ui/my-payments/mockData'
import usePaymentsPagination from '@/shared/hooks/usePaymentsPagination'
import { Pagination, TableBody, TableCell, TableHead, TableRoot, TableRow } from '@/shared/ui'
import { useTranslations } from 'next-intl'

type ColumnType =
  | 'dateOfPayment'
  | 'endDateOfPayment'
  | 'paymentType'
  | 'price'
  | 'subscriptionType'

const MyPayments = () => {
  const t = useTranslations('ProfileSettings.MyPayments')
  /**
   * Используем кастомный хук с сортировкой
   */
  const {
    currentDataOnPage,
    currentPage,
    itemsPerPage,
    onChangeItemsPerPageHandler,
    onCurrentPageClickHandler,
    onSortChangeHandler,
    sortKey,
    sortOrder,
    totalItems,
    totalPages,
  } = usePaymentsPagination(paymentData, 5)

  /**
   * Функция для определения направления сортировки
   */
  const getSortIndicator = (key: ColumnType) => {
    if (sortKey === key) {
      return sortOrder === 'asc' ? ' ↑' : ' ↓'
    }

    return ''
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
                onClick={() => onSortChangeHandler('endDateOfPayment')}
              >
                {t('endDateOfSubscription')}
                {getSortIndicator('endDateOfPayment')}
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
            {currentDataOnPage &&
              currentDataOnPage.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(data.dateOfPayment).toLocaleDateString('ru-RU')}</TableCell>
                  <TableCell>
                    {new Date(data.endDateOfPayment).toLocaleDateString('ru-RU')}
                  </TableCell>
                  <TableCell>{`$${data.price}`}</TableCell>
                  <TableCell>{data.subscriptionType}</TableCell>
                  <TableCell>{data.paymentType}</TableCell>
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
