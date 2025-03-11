import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

type Props = {
  menuContent: ReactNode
  triggerElement: ReactNode
} & ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>

export const CustomDropdown = ({ menuContent, triggerElement, ...props }: Props) => {
  return (
    <DropdownMenuPrimitive.Root {...props}>
      <DropdownMenuPrimitive.Trigger asChild>{triggerElement}</DropdownMenuPrimitive.Trigger>
      {menuContent}
    </DropdownMenuPrimitive.Root>
  )
}

CustomDropdown.displayName = 'CustomDropdown'
