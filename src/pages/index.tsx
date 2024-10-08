import { Pagination } from '@/shared/ui'

export default function Home() {
  return (
    <div>
      Hello <Pagination initialItemsPerPage={10} totalItems={550} />
    </div>
  )
}
