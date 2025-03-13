import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { cn } from '@/shared/utils'
import * as TabsPrimitive from '@radix-ui/react-tabs'

type TabsProps = {
  children: ReactNode
  className?: string
  defaultValue: string
} & ComponentPropsWithoutRef<typeof TabsPrimitive.Root>

const Tabs = forwardRef<ElementRef<typeof TabsPrimitive.Root>, TabsProps>(
  ({ children, className, defaultValue, ...props }, ref) => {
    return (
      <TabsRoot
        className={cn('w-full', className)}
        defaultValue={defaultValue}
        ref={ref}
        {...props}
      >
        {children}
      </TabsRoot>
    )
  }
)

const TabsRoot = TabsPrimitive.Root

export type TabItem = {
  content: ReactNode
  label: string
  value: string
}

type TabsListProps = {
  children: ReactNode
  className?: string
} & ComponentPropsWithoutRef<typeof TabsPrimitive.List>

const TabsList = forwardRef<ElementRef<typeof TabsPrimitive.List>, TabsListProps>(
  ({ children, className, ...props }, ref) => (
    <TabsPrimitive.List className={cn('flex justify-between', className)} ref={ref} {...props}>
      {children}
    </TabsPrimitive.List>
  )
)

TabsList.displayName = TabsPrimitive.List.displayName
type TabsTriggerProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>

const TabsTrigger = forwardRef<ElementRef<typeof TabsPrimitive.Trigger>, TabsTriggerProps>(
  ({ children, value, ...props }, ref) => (
    <TabsPrimitive.Trigger
      className={`w-full h-9 text-base font-600 border-b-2 
  text-dark-100 data-[state=active]:text-accent-500 
  border-dark-100 data-[state=active]:border-accent-500 
  hover:bg-accent-900/15 data-[state=active]:hover:bg-accent-900/15
  active:bg-accent-100/15 data-[state=active]:active:bg-accent-100/15
  disabled:text-dark-300 disabled:cursor-none disabled:border-dark-300
  data-[state=active]:disabled:text-accent-900
  focus-visible:outline focus-visible:outline-accent-500
`}
      ref={ref}
      value={value}
      {...props}
    >
      <span className={'relative z-10'}>{children}</span>
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
