'use client'

import * as React from 'react'

import { cn } from '@/shared/utils'
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  orientation?: 'horizontal' | 'vertical'
  plugins?: CarouselPlugin
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  api: ReturnType<typeof useEmblaCarousel>[1]
  canScrollNext: boolean
  canScrollPrev: boolean
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  scrollNext: () => void
  scrollPrev: () => void
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

export function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  CarouselProps & React.HTMLAttributes<HTMLDivElement>
>(({ children, className, opts, orientation = 'horizontal', plugins, setApi, ...props }, ref) => {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) {
      return
    }

    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext]
  )

  React.useEffect(() => {
    if (!api || !setApi) {
      return
    }

    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) {
      return
    }

    onSelect(api)
    api.on('reInit', onSelect)
    api.on('select', onSelect)

    return () => {
      api?.off('select', onSelect)
    }
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        api: api,
        canScrollNext,
        canScrollPrev,
        carouselRef,
        opts,
        orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
        scrollNext,
        scrollPrev,
      }}
    >
      <div
        aria-roledescription={'carousel'}
        className={cn('relative', className)}
        onKeyDownCapture={handleKeyDown}
        ref={ref}
        role={'region'}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
})

Carousel.displayName = 'Carousel'

export { Carousel, type CarouselApi }
