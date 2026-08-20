import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

function getReducedMotionPreference() {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null
}

export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(
    () => getReducedMotionPreference()?.matches ?? false,
  )

  useEffect(() => {
    const mediaQuery = getReducedMotionPreference()
    if (!mediaQuery) return

    const handleChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return reducedMotion
}

export function useReveal<T extends HTMLElement>(): RefObject<T | null> {
  const elementRef = useRef<T | null>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      element.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        element.classList.add('is-visible')
        observer.unobserve(element)
      },
      { threshold: 0.12 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [reducedMotion])

  return elementRef
}
