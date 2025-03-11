import { useCallback, useEffect, useMemo, useState } from 'react'

import { PaymentsDataResponse } from '@/features/profile-settings-page/types/payments.types'

const usePaymentsPagination = (
  paymentsData: PaymentsDataResponse[] | null,
  initialItemsPerPage = 5
) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage)
  const [currentDataOnPage, setCurrentDataOnPage] = useState<PaymentsDataResponse[]>([])

  // Функция для разделения данных на страницы
  const splitArray = (arr: PaymentsDataResponse[], itemsPerPage: number) => {
    const result = []

    for (let i = 0; i < arr.length; i += itemsPerPage) {
      result.push(arr.slice(i, i + itemsPerPage))
    }

    return result
  }

  // Оптимизированный расчет пагинации с useMemo
  const { splittingData, totalItems, totalPages } = useMemo(() => {
    const safePaymentsData = paymentsData || [] // Защита от null
    const totalItems = safePaymentsData.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const splittingData = splitArray(safePaymentsData, itemsPerPage)

    return { splittingData, totalItems, totalPages }
  }, [paymentsData, itemsPerPage])

  useEffect(() => {
    if (splittingData.length > 0) {
      setCurrentDataOnPage(splittingData[0] || [])
    }
  }, [splittingData])

  const onChangeItemsPerPageHandler = useCallback((newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
  }, [])

  const onCurrentPageClickHandler = useCallback(
    (page: number) => {
      setCurrentPage(page)
      setCurrentDataOnPage(splittingData[page - 1] || [])
    },
    [splittingData]
  )

  return {
    currentDataOnPage,
    currentPage,
    itemsPerPage,
    onChangeItemsPerPageHandler,
    onCurrentPageClickHandler,
    totalItems,
    totalPages,
  }
}

export default usePaymentsPagination
