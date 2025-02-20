import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { cn } from '@/shared/utils'
import * as TabsPrimitive from '@radix-ui/react-tabs'

type TabsProps = {
  className?: string
  defaultValue: string
  tabs: TabItem[]
} & ComponentPropsWithoutRef<typeof TabsPrimitive.Root>

const Tabs = forwardRef<ElementRef<typeof TabsPrimitive.Root>, TabsProps>(
  ({ className, defaultValue, tabs, ...props }, ref) => {
    return (
      <TabsRoot className={'w-full'} defaultValue={defaultValue} ref={ref}>
        <TabsList className={cn('flex justify-between', className)} tabs={tabs} {...props} />
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

export type TabItem = {
  content: ReactNode
  label: string
  value: string
}

type TabsListProps = {
  className?: string
  tabs: TabItem[]
} & ComponentPropsWithoutRef<typeof TabsPrimitive.List>

const TabsList = forwardRef<ElementRef<typeof TabsPrimitive.List>, TabsListProps>(
  ({ className, tabs, ...props }, ref) => (
    <TabsPrimitive.List className={className} ref={ref} {...props}>
      {tabs.map(tab => (
        <TabsTrigger key={tab.value} value={tab.value}>
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsPrimitive.List>
  )
)

TabsList.displayName = TabsPrimitive.List.displayName
type TabsTriggerProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>

const TabsTrigger = forwardRef<ElementRef<typeof TabsPrimitive.Trigger>, TabsTriggerProps>(
  ({ value, ...props }, ref) => (
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
