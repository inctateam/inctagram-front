import { toast } from 'react-toastify'

import {
  useCancelAutoRenewalMutation,
  useGetCurrentSubscriptionsQuery,
} from '@/features/profile-settings-page/api/subscriptions.api'
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
}

export const CurrentSubscription = ({ accountTypeChange }: Props) => {
  const { data: dataSubscriptions, isLoading: isLoadingSubscriptions } =
    useGetCurrentSubscriptionsQuery()
  const [cancelAutoRenewal] = useCancelAutoRenewalMutation()

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
            {dataSubscriptions && (
              <TableRow>
                <TableCell>
                  {formatDate(
                    dataSubscriptions.data[dataSubscriptions.data.length - 1].endDateOfSubscription
                  )}
                </TableCell>
                <TableCell>
                  {formatDate(
                    dataSubscriptions.data[dataSubscriptions.data.length - 1].dateOfPayment
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableRoot>
      </Card>
      <Checkbox
        defaultChecked={dataSubscriptions?.hasAutoRenewal}
        label={'Auto-Renewal'}
        name={'autoRenewal'}
        onCheckedChange={handleAutoRenewal}
      />
    </>
  )
}
