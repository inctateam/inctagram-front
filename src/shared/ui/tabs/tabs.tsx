import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { cn } from '@/shared/utils'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { VariantProps, cva } from 'class-variance-authority'

export const tabsVariants = cva([`w-[85px] h-9 text-base font-600 border-b-2`], {
  variants: {
    variant: {
      primary: [
        `text-accent-500 border-accent-500`,
        `hover:bg-accent-900 hover:opacity-15`,
        `focus-visible:outline focus-visible:outline-accent-500 focus-visible:opacity-15`,
        `active:bg-accent-100 active:opacity-15`,
        `disabled:text-primary-900 disabled:cursor-none`,
      ],
      secondary: [
        `text-dark-100 border-dark-100`,
        `hover:bg-primary-900 hover:opacity-15`,
        `focus-visible:outline focus-visible:outline-accent-500 focus-visible:opacity-15`,
        `active:bg-primary-100 hover:opacity-15`,
        `disabled:text-dark-300 disabled:cursor-none disabled:border-dark-300`,
      ],
    },
  },
})

type TabsProps = {
  children: ReactNode
  className?: string
  disabled?: boolean
  hover?: boolean
  isActive?: boolean
  isFocused?: boolean
  value: string
} & ComponentPropsWithoutRef<'button'> &
  VariantProps<typeof tabsVariants>

const Tabs = forwardRef<ElementRef<typeof TabsPrimitive.Root>, TabsProps>(
  (
    {
      children,
      className,
      disabled,
      hover,
      isActive,
      isFocused,
      value,
      variant = 'primary',
      ...props
    },
    ref
  ) => {
    return (
      <TabsRoot ref={ref}>
        <TabsList>
          <TabsTrigger
            className={className}
            disabled={disabled}
            hover={hover}
            isActive={isActive}
            isFocused={isFocused}
            variant={variant}
            {...props}
            value={value}
          >
            {value}
          </TabsTrigger>
        </TabsList>
        <TabsContent value={value}>{children}</TabsContent>
      </TabsRoot>
    )
  }
)

const TabsRoot = TabsPrimitive.Root

const TabsList = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List className={className} ref={ref} {...props} />
))

TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  {
    disabled?: boolean
    hover?: boolean
    isActive?: boolean
    isFocused?: boolean
    value: string
    variant?: VariantProps<typeof tabsVariants>['variant']
  } & ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(
  (
    {
      className,
      disabled = false,
      hover = false,
      isActive = false,
      isFocused = false,
      value,
      variant = 'primary',
      ...props
    },
    ref
  ) => (
    <TabsPrimitive.Trigger
      className={cn(
        tabsVariants({ variant }),
        disabled && `text-accent-900 border-accent-900 cursor-none`,
        isFocused && `outline outline-accent-500`,
        isActive && `bg-accent-100`,
        className
      )}
      ref={ref}
      value={value}
      {...props}
    >
      {isFocused && <div className={'absolute inset-0 bg-accent-900 opacity-15'}></div>}
      {isActive && <div className={'absolute inset-0 bg-accent-100 opacity-15'}></div>}
      {hover && <div className={'absolute inset-0 bg-accent-900 opacity-15'}></div>}
      <span className={'relative z-10'}>{value}</span>
    </TabsPrimitive.Trigger>
  )
)

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ children, className, ...props }, ref) => (
  <TabsPrimitive.Content className={className} ref={ref} {...props}>
    {children}
  </TabsPrimitive.Content>
))

TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsContent, TabsList, TabsRoot, TabsTrigger }
