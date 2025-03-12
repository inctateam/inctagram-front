import { useCallback, useMemo, useState } from 'react'

import { MyPayment, SubscriptionType } from '@/features/profile-settings-page/types'

type SortOrder = 'asc' | 'desc'

const usePaymentsPagination = (paymentsData: MyPayment[] | undefined, initialItemsPerPage = 5) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage)
  const [sortKey, setSortKey] = useState<keyof MyPayment | null>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  /**
   * Функция для форматирования subscriptionType
   */
  const formatSubscriptionDuration = (subscriptionType: SubscriptionType): string => {
    const formats: Record<SubscriptionType, string> = {
      [SubscriptionType.DAY]: '1 day',
      [SubscriptionType.MONTHLY]: '1 month',
      [SubscriptionType.WEEKLY]: '7 days',
    }

    return formats[subscriptionType]
  }

  /**
   * Сортировка данных по ключу
   */
  const sortData = (data: MyPayment[], key: keyof MyPayment, order: SortOrder) => {
    return [...data].sort((a, b) => {
      if (key === 'subscriptionType') {
        const durationA = getDurationInDays(a.subscriptionType)
        const durationB = getDurationInDays(b.subscriptionType)

        return order === 'asc' ? durationA - durationB : durationB - durationA
      }

      if (typeof a[key] === 'number' && typeof b[key] === 'number') {
        return order === 'asc' ? a[key] - b[key] : b[key] - a[key]
      }

      if (typeof a[key] === 'string' && typeof b[key] === 'string') {
        return order === 'asc' ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key])
      }

      return 0
    })
  }

  /**
   * Преобразование subscriptionType в количество дней
   */
  const getDurationInDays = (subscriptionType: SubscriptionType): number => {
    switch (subscriptionType) {
      case SubscriptionType.DAY:
        return 1
      case SubscriptionType.MONTHLY:
        return 30
      case SubscriptionType.WEEKLY:
        return 7
      default:
        return 0
    }
  }

  /**
   * Разделение данных на страницы
   */
  const splitArray = (arr: MyPayment[], itemsPerPage: number) => {
    const result = []

    for (let i = 0; i < arr.length; i += itemsPerPage) {
      result.push(arr.slice(i, i + itemsPerPage))
    }

    return result
  }

  /**
   * Оптимизированный расчет пагинации и сортировки с useMemo
   */
  const { splittingData, totalItems, totalPages } = useMemo(() => {
    const safePaymentsData = paymentsData || []
    const sortedData = sortKey ? sortData(safePaymentsData, sortKey, sortOrder) : safePaymentsData
    const totalItems = sortedData.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const splittingData = splitArray(sortedData, itemsPerPage)

    return { splittingData, totalItems, totalPages }
  }, [paymentsData, itemsPerPage, sortKey, sortOrder])

  const currentDataOnPage = useMemo(() => {
    return splittingData[currentPage - 1] || []
  }, [splittingData, currentPage])

  const onChangeItemsPerPageHandler = useCallback((newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
  }, [])

  const onCurrentPageClickHandler = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  const onSortChangeHandler = useCallback(
    (key: keyof MyPayment) => {
      setSortOrder(prevOrder => (sortKey === key && prevOrder === 'asc' ? 'desc' : 'asc'))
      setSortKey(key)
      setCurrentPage(1)
    },
    [sortKey]
  )

  return {
    currentDataOnPage: paymentsData ? currentDataOnPage : [],
    currentPage,
    formatSubscriptionDuration,
    itemsPerPage,
    onChangeItemsPerPageHandler,
    onCurrentPageClickHandler,
    onSortChangeHandler,
    sortKey,
    sortOrder,
    totalItems: paymentsData ? totalItems : 0,
    totalPages: paymentsData ? totalPages : 0,
  }
}

export default usePaymentsPagination
