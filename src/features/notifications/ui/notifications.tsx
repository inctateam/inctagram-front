import { BellOutline } from '@/assets/icons'
import { Badge, CustomDropdown, IconButton, Typography } from '@/shared/ui'
import { ScrollArea } from '@/shared/ui/scrollbar'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

const items = [
  {
    isReaded: false,
    text: 'Следующий платеж у вас спишется через 1 день',
    timestamp: '1 час назад',
    title: 'Новое уведомление!',
  },
  {
    isReaded: false,
    text: 'Ваша подписка истекает через 7 дней',
    timestamp: '1 день назад',
    title: 'Новое уведомление!',
  },
  {
    isReaded: true,
    text: 'Следующий платеж у вас спишется через 1 день',
    timestamp: '1 час назад',
    title: 'Новое уведомление!',
  },
  {
    isReaded: true,
    text: 'Ваша подписка истекает через 7 дней',
    timestamp: '1 день назад',
    title: 'Новое уведомление!',
  },
  {
    isReaded: true,
    text: 'Ваша подписка истекает через 7 дней',
    timestamp: '1 день назад',
    title: 'Новое уведомление!',
  },
  {
    isReaded: true,
    text: 'Ваша подписка истекает через 7 дней',
    timestamp: '1 день назад',
    title: 'Новое уведомление!',
  },
]

const notificationCount = 3

export const Notifications = () => {
  const customMenuContent = (
    <DropdownMenuPrimitive.Content
      align={'end'}
      className={
        'z-50 p-4 translate-x-3 w-[355px] h-[440px] bg-dark-500 rounded-md border border-dark-100'
      }
    >
      <div
        className={
          'absolute -top-2 right-5 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-dark-100'
        }
      ></div>
      <div
        className={
          'absolute -top-[5px] right-[21px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-dark-500'
        }
      ></div>

      <Typography className={'mb-4'} variant={'h3'}></Typography>
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
                  <Typography className={'text-accent-500'} variant={'small'}>
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
