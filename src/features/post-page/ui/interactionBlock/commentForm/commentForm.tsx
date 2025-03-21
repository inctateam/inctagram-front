import React, { useState } from 'react'

import { Button, Textarea } from '@/shared/ui'

type CommentFormProps = {
  onSubmit: (comment: string) => void
}

const CommentForm = ({ onSubmit }: CommentFormProps) => {
  const [comment, setComment] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
  }

  const handleSubmit = () => {
    if (!comment.trim()) {
      return
    }
    onSubmit(comment)
    setComment('')
  }

  return (
    <div className={'flex justify-between items-center py-1'}>
      <Textarea
        autoResize
        className={
          'px-0 scrollbar-thin scrollbar-none [&::-webkit-scrollbar]:hidden h-12 max-h-10 border-none'
        }
        minHeight={30}
        onChange={handleChange}
        placeholder={'Add a Comment...'}
        value={comment}
      />
      <Button disabled={!comment.trim()} onClick={handleSubmit} variant={'text'}>
        Publish
      </Button>
    </div>
  )
}

export { CommentForm }
