import { type ReactNode } from 'react'
import { useReveal } from '../shared/useReveal'

type RevealProps = {
    children: ReactNode
    className?: string
    /** мс задержки перед началом анимации — удобно для "каскада" элементов */
    delay?: number
    /** направление, с которого элемент "прилетает" */
    from?: 'up' | 'down' | 'left' | 'right' | 'scale'
}

export default function Reveal({
    children,
    className = '',
    delay = 0,
    from = 'up',
}: RevealProps) {
    const { ref, isVisible } = useReveal<HTMLDivElement>()

    return (
        <div
            ref={ref}
            className={`reveal reveal--${from} ${isVisible ? 'reveal-visible' : ''} ${className}`}
            style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
        >
            {children}
        </div>
    )
}
