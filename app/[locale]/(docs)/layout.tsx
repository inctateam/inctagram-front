import { ReactNode } from 'react'

import { CenteredLayout } from '@/layouts'

type Props = {
  children: ReactNode
}

export default function DocsLayout({ children }: Props) {
  const auth = true

  return <CenteredLayout auth={auth}>{children}</CenteredLayout>
}
