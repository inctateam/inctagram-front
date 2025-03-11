import { paymentData } from '@/features/profile-settings-page/ui/my-payments/mockData'
import usePaymentsPagination from '@/shared/hooks/usePaymentsPagination'
import { Pagination, TableBody, TableCell, TableHead, TableRoot, TableRow } from '@/shared/ui'
import { useTranslations } from 'next-intl'

const MyPayments = () => {
  const t = useTranslations('ProfileSettings.MyPayments')
  const {
    currentDataOnPage,
    currentPage,
    itemsPerPage,
    onChangeItemsPerPageHandler,
    onCurrentPageClickHandler,
    totalItems,
    totalPages,
  } = usePaymentsPagination(paymentData, 5)

  return (
    <div className={'flex items-start flex-col w-full gap-9 mt-6'}>
      <TableRoot className={'w-full'}>
        <TableHead>
          <TableRow>
            <TableCell>{t('dateOfPayment')}</TableCell>
            <TableCell>{t('endDateOfSubscription')}</TableCell>
            <TableCell>{t('price')}</TableCell>
            <TableCell>{t('subscriptionType')}</TableCell>
            <TableCell>{t('paymentType')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentDataOnPage &&
            currentDataOnPage.map((data, index) => (
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

// const paymentsData = paymentData // В вашем случае это данные, которые вы получаете
// const [totalItems, setTotalItems] = useState(paymentsData?.length || 100)
// const [currentPage, setCurrentPage] = useState(1)
// const [itemsPerPage, setItemsPerPage] = useState(5)
// const [currentDataOnPage, setCurrentDataOnPage] = useState<PaymentsDataResponse[]>([])
//
// // Функция для разделения данных на страницы
// const splitArray = (arr: PaymentsDataResponse[], itemsPerPage: number) => {
//   const result = []
//
//   for (let i = 0; i < arr.length; i += itemsPerPage) {
//     result.push(arr.slice(i, i + itemsPerPage))
//   }
//
//   return result
// }

// useMemo для вычислений, чтобы не перерасчитывать их при каждом рендере
// const { splittingData, totalPages } = useMemo(() => {
//   if (!paymentsData) {
//     return { splittingData: [], totalPages: 1 }
//   }
//   const totalPages = Math.ceil(paymentsData.length / itemsPerPage) // Общее количество страниц
//   const splittingData = splitArray(paymentsData, itemsPerPage) // Разделение данных на страницы
//
//   return { splittingData, totalPages }
// }, [paymentsData, itemsPerPage]) // Зависимости: меняются, если изменяются данные или количество элементов на странице
//
// useEffect(() => {
//   if (splittingData.length > 0) {
//     setCurrentDataOnPage(splittingData[0] || []) // Устанавливаем данные для первой страницы
//   }
// }, [splittingData]) // Обновляем данные на странице, если splittingData изменилось
//
// const onChangeItemsPerPageHandler = useCallback((itemsPerPage: number) => {
//   setItemsPerPage(itemsPerPage) // Изменение количества элементов на странице
//   setCurrentPage(1) // Сброс на первую страницу
// }, [])
//
// const onCurrentPageClickHandler = useCallback(
//   (page: number) => {
//     setCurrentPage(page) // Переключение на текущую страницу
//     setCurrentDataOnPage(splittingData[page - 1] || [])
//   },
//   [splittingData]
// )
