import { toast } from 'react-toastify'

import { useCancelAutoRenewalMutation } from '@/features/profile-settings-page/api/subscriptions.api'
import { CurrentPaymentSubscriptionResponse } from '@/features/profile-settings-page/types'
import { useBoolean } from '@/shared/hooks'
import {
  Card,
  Checkbox,
  ProgressBar,
  TableBody,
  TableCell,
  TableHead,
  TableRoot,
  TableRow,
  Typography,
} from '@/shared/ui'

type Props = {
  //accountTypeChange: () => void
  currentSubscriptions: CurrentPaymentSubscriptionResponse
}

export const CurrentSubscription = ({ currentSubscriptions }: Props) => {
  const [cancelAutoRenewal, { isLoading: isLoadingCancelAutoRenewal }] =
    useCancelAutoRenewalMutation()
  const [isAutoRenewalChecked, { setFalse: disableAutoRenewal, setTrue: enableAutoRenewal }] =
    useBoolean(currentSubscriptions?.hasAutoRenewal)

  const [isCheckboxDisabled, { setTrue: disableCheckbox }] = useBoolean()
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)

    return date.toLocaleDateString('ru-RU') // Для формата 12.12.2022
  }
  const handleAutoRenewal = async (checked: boolean) => {
    if (checked) {
      // Если пытаются включить автоподписку, но она уже отключена
      if (isCheckboxDisabled) {
        return
      }

      // Здесь можно добавить логику для включения автоподписки, если нужно
      return
    }

    try {
      await cancelAutoRenewal().unwrap()
      toast.success('Auto renewal has been cancelled')
      disableAutoRenewal() // Снимаем галочку
      disableCheckbox() // Блокируем чекбокс
    } catch {
      toast.error('Failed to cancel auto renewal')
      // В случае ошибки оставляем чекбокс в прежнем состоянии
      enableAutoRenewal()
    }
  }

  // const handleAutoRenewal = async (value: boolean) => {
  //   if (value) {
  //     return
  //   }
  //   try {
  //     await cancelAutoRenewal().unwrap()
  //     toast.success('Auto renewal has been cancelled')
  //     // accountTypeChange()
  //   } catch {
  //     toast.error('Failed to cancel auto renewal')
  //   }
  // }

  if (isLoadingCancelAutoRenewal) {
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
            {currentSubscriptions && (
              <TableRow>
                <TableCell>
                  {formatDate(
                    currentSubscriptions.data[currentSubscriptions.data.length - 1]
                      .endDateOfSubscription
                  )}
                </TableCell>
                <TableCell>
                  {formatDate(
                    (date => {
                      const newDate = new Date(date)

                      newDate.setDate(newDate.getDate() + 1)

                      return newDate.toISOString()
                    })(
                      currentSubscriptions.data[currentSubscriptions.data.length - 1]
                        .endDateOfSubscription
                    )
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableRoot>
      </Card>
      <Checkbox
        checked={isAutoRenewalChecked}
        disabled={!isCheckboxDisabled}
        label={'Auto-Renewal'}
        name={'autoRenewal'}
        onCheckedChange={handleAutoRenewal}
      />
    </>
  )
}
