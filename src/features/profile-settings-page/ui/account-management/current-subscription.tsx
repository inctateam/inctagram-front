import { toast } from 'react-toastify'

import { useCancelAutoRenewalMutation } from '@/features/profile-settings-page/api/subscriptions.api'
import { CurrentPaymentSubscriptionResponse } from '@/features/profile-settings-page/types'
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
  accountTypeChange: () => void
  currentSubscriptions: CurrentPaymentSubscriptionResponse
}

export const CurrentSubscription = ({ accountTypeChange, currentSubscriptions }: Props) => {
  const [cancelAutoRenewal, { isLoading: isLoadingCancelAutoRenewal }] =
    useCancelAutoRenewalMutation()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)

    return date.toLocaleDateString('ru-RU') // Для формата 12.12.2022
  }

  const handleAutoRenewal = async (value: boolean) => {
    if (value) {
      return
    }
    try {
      await cancelAutoRenewal().unwrap()
      toast.success('Auto renewal has been cancelled')
      accountTypeChange()
    } catch {
      toast.error('Failed to cancel auto renewal')
    }
  }

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
        defaultChecked={currentSubscriptions?.hasAutoRenewal}
        label={'Auto-Renewal'}
        name={'autoRenewal'}
        onCheckedChange={handleAutoRenewal}
      />
    </>
  )
}
