import { ComponentPropsWithoutRef } from 'react'

import * as TabsPrimitive from '@radix-ui/react-tabs'

type TabsProps = {
  value: string
  variant?: keyof typeof tabsVariants
} & ComponentPropsWithoutRef<'button'>

export const tabsVariants = {
  primary:
    'w-20 h-9 text-base font-semibold border-b-2 text-blue-500 border-blue-500 hover:text-blue-600 hover:border-blue-600 focus:text-blue-600 focus:border-blue-600 active:text-blue-700 active:border-blue-700 disabled:text-gray-300 disabled:border-gray-300',
  secondary:
    'w-20 h-9 text-base font-semibold border-b-2 text-green-200 border-gray-200 hover:text-red-300 hover:border-gray-300 focus:text-gray-300 focus:border-gray-300 active:text-gray-400 active:border-gray-400 disabled:text-gray-300 disabled:border-gray-300',
}

export const Tabs = ({ className, value, variant = 'primary', ...props }: TabsProps) => {
  return (
    <TabsPrimitive.Root>
      <TabsPrimitive.List>
        <TabsPrimitive.Trigger
          className={`${tabsVariants[variant]} ${className}`}
          value={value}
          {...props}
        >
          {value}
        </TabsPrimitive.Trigger>
      </TabsPrimitive.List>
    </TabsPrimitive.Root>
  )
}

//Tabs.Trigger представляет собой отдельные вкладки. Каждая вкладка имеет нижний бордер, который становится видимым при наведении или фокусе (border-b-2 border-transparent hover:border-blue-500 focus:border-blue-500).
