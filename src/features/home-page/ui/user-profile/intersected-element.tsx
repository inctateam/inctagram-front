import { RefObject, useEffect, useRef, useState } from 'react'

interface ElementOnScreenOptions {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
}
export const useElementOnScreen = (
  options: ElementOnScreenOptions
): [RefObject<HTMLDivElement>, boolean] => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const callbackFunction = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries

    setIsVisible(entry.isIntersecting)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options)

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [containerRef, isVisible])

  return [containerRef, isVisible]
}
