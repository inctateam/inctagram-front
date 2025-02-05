import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui'

type ImageCarouselProps = {
  images: string[]
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  return (
    <Carousel opts={{ loop: true }}>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className={'flex aspect-square items-center justify-center'}>
              <img alt={'img'} className={'w-full h-full object-cover'} src={image} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  )
}
