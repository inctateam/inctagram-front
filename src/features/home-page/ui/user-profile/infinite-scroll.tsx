import { RefObject, useEffect, useRef } from 'react'

interface Props<T extends Element> {
  onVisibilityChange?: (isVisible: boolean) => void
  rootRef: RefObject<T>
}

const InfiniteScroll = <T extends Element = HTMLElement>({
  onVisibilityChange,
  rootRef,
}: Props<T>) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const intersectedElement = ref.current

    if (!root || !intersectedElement) {
      console.log('Root or intersectedElement is null') // Логирование

      return
    }

    const intersectionObserver = new IntersectionObserver(
      entries => {
        console.log('IntersectionObserver entries:', entries) // Логирование
        if (entries.length === 0) {
          return
        }

        const entry = entries[0]

        console.log('Entry isIntersecting:', entry.isIntersecting) // Логирование
        if (onVisibilityChange) {
          onVisibilityChange(entry.isIntersecting)
        }
      },
      { root: root, threshold: [1.0] }
    )

    // Начать наблюдение
    intersectionObserver.observe(intersectedElement)

    return () => {
      intersectionObserver.unobserve(intersectedElement)
      intersectionObserver.disconnect()
    }
  }, [onVisibilityChange])

  return <div ref={ref} style={{ backgroundColor: 'red', height: '10px' }} />
}

export default InfiniteScroll
