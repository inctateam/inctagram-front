import { ComponentPropsWithoutRef } from 'react'

import * as SelectPrimitive from '@radix-ui/react-select'

type SelectRootProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Root>

const SelectRoot = ({ ...props }: SelectRootProps) => {
  return <SelectPrimitive.Root {...props} />
}

SelectRoot.displayName = SelectPrimitive.Root.displayName

export { SelectRoot, type SelectRootProps }
