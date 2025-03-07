import { BellOutline } from '@/assets/icons'
import { Badge, CustomDropdown, IconButton, Typography } from '@/shared/ui'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { ScrollArea } from '@/shared/ui/scrollbar'

const items = [
  {
    text: 'Следующий платеж у вас спишется через 1 день',
    timestamp: '1 час назад',
    title: 'Новое уведомление!',
    isReaded: false,
  },
  {
    text: 'Ваша подписка истекает через 7 дней',
    timestamp: '1 день назад',
    title: 'Новое уведомление!',
    isReaded: false,
  },
  {
    text: 'Следующий платеж у вас спишется через 1 день',
    timestamp: '1 час назад',
    title: 'Новое уведомление!',
    isReaded: true,
  },
  {
    text: 'Ваша подписка истекает через 7 дней',
    timestamp: '1 день назад',
    title: 'Новое уведомление!',
    isReaded: true,
  },
  {
    text: 'Ваша подписка истекает через 7 дней',
    timestamp: '1 день назад',
    title: 'Новое уведомление!',
    isReaded: true,
  },
  {
    text: 'Ваша подписка истекает через 7 дней',
    timestamp: '1 день назад',
    title: 'Новое уведомление!',
    isReaded: true,
  },
]

const notificationCount = 3

export const NotificationsDropdown = () => {
  const customMenuContent = (
    <DropdownMenuPrimitive.Content
      align={'end'}
      className={'z-50 p-4 w-[355px] h-[440px] bg-dark-500 rounded-md border border-dark-100'}
    >
      <Typography className={'mb-4'} variant={'h3'}>
        Уведомления
      </Typography>

      <ScrollArea className={'h-[350px] w-[330px]'}>
        {items.map((item, i) => (
          <DropdownMenuPrimitive.Item
            className={
              'relative flex items-center text-sm pr-1' +
              (i < items.length - 1 ? ' border-b border-dark-100' : '') +
              (i === 0 ? ' border-t border-dark-100' : '')
            }
            key={i}
          >
            <div>
              <div className={'flex items-center gap-1 mt-3'}>
                <Typography className={'font-bold'} variant={'medium14'}>
                  {item.title}
                </Typography>
                {!item.isReaded && (
                  <Typography variant={'small'} className={'text-accent-500'}>
                    Новое
                  </Typography>
                )}
              </div>
              <Typography>{item.text}</Typography>
              <Typography className={'text-xs text-light-900 mb-3'}>{item.timestamp}</Typography>
            </div>
          </DropdownMenuPrimitive.Item>
        ))}
      </ScrollArea>
    </DropdownMenuPrimitive.Content>
  )

  return (
    <CustomDropdown
      menuContent={customMenuContent}
      triggerElement={
        <IconButton>
          <Badge badgeContent={notificationCount} className={`mr-12`}>
            <BellOutline />
          </Badge>
        </IconButton>
      }
    />
  )
}
