'use client'

import * as React from 'react'
import { ComponentPropsWithoutRef, ReactNode, useState } from 'react'

import { MoreHorizontalOutline } from '@/assets/icons'
import { Button } from '@/shared/ui'
import { cn } from '@/shared/utils'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

type DropdownMenuItemProps = {
  icon: ReactNode
  label: string
}

type Props = {
  className?: string
  items: DropdownMenuItemProps[]
  onClick: (label: string) => void
} & ComponentPropsWithoutRef<typeof DropdownMenu>

export const Dropdown = ({ className, items, onClick }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu onOpenChange={setOpen}>
      <DropdownMenuTrigger className={'focus:outline-none'}>
        <MoreHorizontalOutline
          className={cn(
            'w-6 h-6 hover:text-blue-500 active:text-blue-500',
            open && 'text-blue-500'
          )}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align={'end'} className={className}>
        {items.map((item, i) => (
          <DropdownMenuItem key={i}>
            <Button
              className={'text-light-100'}
              onClick={() => onClick(item.label)}
              startIcon={item.icon}
              variant={'text'}
            >
              {item.label}
            </Button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border border-dark-100 bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      ref={ref}
      sideOffset={sideOffset}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))

DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  {
    inset?: boolean
  } & React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      className
    )}
    ref={ref}
    {...props}
  />
))

DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName
