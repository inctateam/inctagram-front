import {
  Card,
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Carousel> = {
  component: Carousel,
  tags: ['autodocs'],
  title: 'UI/Carousel/Carousel',
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return (
      <Carousel className={'w-full max-w-[500px]'} opts={{ loop: true }}>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card>
                <div className={'flex aspect-square items-center justify-center p-6'}>
                  <span className={'text-4xl font-semibold'}>{index + 1}</span>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselDots />
      </Carousel>
    )
  },
}
