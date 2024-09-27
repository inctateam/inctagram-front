import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { cn } from '@/shared/utils'
import * as TabsPrimitive from '@radix-ui/react-tabs'

type TabsProps = {
  value: string
  //variant?: keyof typeof tabsVariants
} & ComponentPropsWithoutRef<'button'>

// export const tabsVariants = {
//   primary: [
//     `w-[85px] h-9 text-base font-600 border-b-2 text-accent-500 border-accent-500`,
//     `hover: bg-accent-900 hover: opacity-15`,
//     `focus-visible:outline focus-visible:outline-accent-500 focus-visible:opacity-15`,
//     `active: bg-accent-100 active: opacity-15`,
//     `disabled: text-primary-900 disabled: cursor-none`,
//   ],
//   secondary: [
//     `w-[85px] h-9 text-base font-600 border-b-2 text-dark-100 border-dark-100`,
//     `hover: bg-primary-900 hover: opacity-15`,
//     `focus-visible:outline focus-visible:outline-accent-500 focus-visible:opacity-15`,
//     `active: bg-primary-100 hover: opacity-15`,
//     `disabled: text-dark-300 disabled: cursor-none disabled: border-dark-300`,
//   ],
// }
const Tabs = forwardRef<ElementRef<typeof TabsPrimitive.Root>, TabsProps>(
  ({ children, className, value, ...props }, ref) => {
    const stringValue = Array.isArray(value) ? value[0] : value

    return (
      <TabsRoot ref={ref}>
        <TabsList>
          <TabsTrigger {...props} className={className} value={stringValue} />
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
    isActive?: boolean
    isFocused?: boolean
    //tabsVariant?: keyof typeof tabsVariants
    value: string
  } & ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, disabled = false, isActive = false, isFocused = false, value, ...props }, ref) => (
  <TabsPrimitive.Trigger
    className={cn(
      `
      w-[85px] h-9 text-base font-600 border-b-2 text-accent-500 border-accent-500`,
      // hover: bg-accent-900 hover: opacity-15
      // focus-visible:outline focus-visible:outline-accent-500 focus-visible:opacity-15

      disabled && `text-primary-900 disabled: cursor-none`,
      isFocused && `outline-accent-500 opacity-15`,
      isActive && `bg-accent-100 opacity-15`,
      className
    )}
    ref={ref}
    value={value}
    {...props}
  />
))

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
