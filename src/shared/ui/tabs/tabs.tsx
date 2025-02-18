import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { cn } from '@/shared/utils'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { VariantProps, cva } from 'class-variance-authority'

export const tabsVariants = cva([`w-full h-9 text-base font-600 border-b-2`], {
  variants: {
    variant: {
      primary: [
        `text-accent-500 border-accent-500`,
        `hover:bg-accent-900 hover:opacity-15`,
        `focus:outline focus:outline-accent-500 focus:opacity-15`,
        `active:bg-accent-100 active:opacity-15`,
        `disabled:text-primary-900 disabled:cursor-none`,
      ],
      secondary: [
        `text-dark-100 border-dark-100`,
        `hover:bg-primary-900 hover:opacity-15`,
        `focus:outline focus:outline-accent-500 focus:opacity-15`,
        `active:bg-primary-100 hover:opacity-15`,
        `disabled:text-dark-300 disabled:cursor-none disabled:border-dark-300`,
      ],
    },
  },
})

type TabsProps = {
  className?: string
  disabled?: boolean
  // children: ReactNode
  full?: boolean
  isActive?: boolean
  isFocused?: boolean
  tabs: TabItem[]
  value: string
  variant?: 'primary' | 'secondary' | null
} & ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
const Tabs = forwardRef<ElementRef<typeof TabsPrimitive.Root>, TabsProps>(
  (
    {
      // children,
      className,
      disabled,
      full,
      isActive,
      isFocused,
      tabs,
      value,
      // variant = 'primary',
      ...props
    },
    ref
  ) => {
    // const tabs = [{ content: children, disabled, isActive, isFocused, label: value, value }]

    return (
      <TabsRoot className={`${full && 'w-full'}`} defaultValue={value} ref={ref}>
        <TabsList
          className={className}
          disabled={disabled}
          isActive={isActive}
          isFocused={isFocused}
          tabs={tabs}
          // variant={variant ?? 'primary'}
          // variant={isActive ? 'primary' : 'secondary'}
          {...props}
        />
        {tabs.map(t => (
          <TabsContent key={t.value} value={t.value}>
            {t.content}
          </TabsContent>
        ))}
      </TabsRoot>
    )
  }
)

const TabsRoot = TabsPrimitive.Root

type TabItem = {
  content: ReactNode
  disabled?: boolean
  isActive?: boolean
  isFocused?: boolean
  label: string
  value: string
  variant?: 'primary' | 'secondary' | null
}

type TabsListProps = {
  className?: string
  disabled?: boolean
  isActive?: boolean
  isFocused?: boolean
  tabs: TabItem[]
  // variant?: 'primary' | 'secondary'
} & ComponentPropsWithoutRef<typeof TabsPrimitive.List>

const TabsList = forwardRef<ElementRef<typeof TabsPrimitive.List>, TabsListProps>(
  ({ className, tabs, ...props }, ref) => (
    <TabsPrimitive.List className={className} ref={ref} {...props}>
      {tabs.map(tab => (
        <TabsTrigger
          disabled={tab.disabled}
          isActive={tab.isActive}
          isFocused={tab.isFocused}
          key={tab.value}
          value={tab.value}
          variant={tab.variant}
        >
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsPrimitive.List>
  )
)

TabsList.displayName = TabsPrimitive.List.displayName
type TabsTriggerProps = {
  disabled?: boolean
  isActive?: boolean
  isFocused?: boolean
  value: string
  variant?: VariantProps<typeof tabsVariants>['variant']
} & ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>

const TabsTrigger = forwardRef<ElementRef<typeof TabsPrimitive.Trigger>, TabsTriggerProps>(
  (
    {
      className,
      disabled = false,
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
        disabled && `text-accent-900 border-accent-900 cursor-none pointer-events-none`,
        isFocused && `outline outline-2 outline-accent-500 pointer-events-none`,
        isActive && `bg-accent-100`,
        className
      )}
      ref={ref}
      value={value}
      {...props}
    >
      <span className={'relative z-10'}>{value}</span>
    </TabsPrimitive.Trigger>
  )
)

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

type TabsContentProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Content>

const TabsContent = forwardRef<ElementRef<typeof TabsPrimitive.Content>, TabsContentProps>(
  ({ children, className, value, ...props }, ref) => (
    <TabsPrimitive.Content className={className} ref={ref} value={value} {...props}>
      {children}
    </TabsPrimitive.Content>
  )
)

TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsContent, TabsList, TabsRoot, TabsTrigger }
