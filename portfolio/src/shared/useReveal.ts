import { useEffect, useRef, useState } from 'react'

/**
 * Отслеживает появление элемента во вьюпорте и один раз "включает" его -
 * используется для плавных transition-эффектов между секциями при скролле.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
    threshold = 0.2
) {
    const ref = useRef<T | null>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const node = ref.current
        if (!node) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.unobserve(node)
                }
            },
            { threshold, rootMargin: '0px 0px -10% 0px' }
        )

        observer.observe(node)
        return () => observer.disconnect()
    }, [threshold])

    return { ref, isVisible }
}
