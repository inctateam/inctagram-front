import { Card } from '@/shared/ui'
import Link from 'next/link'

export default function Profile({ params: { id } }: { params: { id: string } }) {
  return (
    <div>
      Profile {id}
      <div className={'w-full flex gap-1 flex-wrap'}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div className={'w-full max-w-xs aspect-square'}>
            <Link href={`/posts/${index + 1}`} key={index}>
              <Card className={'flex items-center justify-center w-full h-full'}>
                Post {index + 1}
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
