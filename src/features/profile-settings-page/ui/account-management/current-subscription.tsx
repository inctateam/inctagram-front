import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import {
  useCancelAutoRenewalMutation,
  useGetCurrentSubscriptionsQuery,
} from '@/features/profile-settings-page/api/subscriptions.api'
import {
  Card,
  ControlledCheckbox,
  ProgressBar,
  TableBody,
  TableCell,
  TableHead,
  TableRoot,
  TableRow,
  Typography,
} from '@/shared/ui'

// type Props = {}

export const CurrentSubscription = () => {
  const { data: dataSubscriptions, isLoading: isLoadingSubscriptions } =
    useGetCurrentSubscriptionsQuery()
  const [cancelAutoRenewal] = useCancelAutoRenewalMutation()
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      autoRenewal: false, // Изначально autoRenewal в false
    },
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)

    return date.toLocaleDateString('ru-RU') // Для формата 12.12.2022
  }

  useEffect(() => {
    if (dataSubscriptions) {
      setValue('autoRenewal', dataSubscriptions.hasAutoRenewal) // Устанавливаем значение при получении данных
    }
  }, [dataSubscriptions, setValue])

  const handleAutoRenewal = async () => {
    try {
      const response = await cancelAutoRenewal()

      if (response) {
        toast.success('Auto renewal has been cancelled')
      }
    } catch {
      toast.error('Failed to cancel auto renewal')
    }
  }

  if (isLoadingSubscriptions) {
    return <ProgressBar />
  }

  return (
    <>
      <Typography className={'mt-7 mb-1.5'} variant={'bold16'}>
        Current Subscription:
      </Typography>
      <Card className={'mb-5'}>
        <TableRoot className={'text-left'}>
          <TableHead className={'text-light-900'}>
            <TableRow isHeader>
              <TableCell>Expire at</TableCell>
              <TableCell>Next payment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataSubscriptions?.data.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{formatDate(data.endDateOfSubscription)}</TableCell>
                <TableCell>{formatDate(data.dateOfPayment)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableRoot>
      </Card>
      <form onSubmit={handleSubmit(handleAutoRenewal)}>
        <ControlledCheckbox control={control} label={'Auto-Renewal'} name={'autoRenewal'} />
      </form>
    </>
  )
}
