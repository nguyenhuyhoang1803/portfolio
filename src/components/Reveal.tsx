import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { motion, useAnimationControls } from 'motion/react'

type Direction = 'up' | 'left' | 'right'

export function Reveal({ children, direction = 'up', delay = 0, className, as = 'div' }: {
  children: ReactNode
  direction?: Direction
  delay?: number
  className?: string
  as?: 'div' | 'span' | 'li'
}) {
  const element = useRef<HTMLElement>(null)
  const controls = useAnimationControls()
  const Component = motion[as]

  useLayoutEffect(() => {
    const node = element.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    if (preference.matches) return

    const mobile = matchMedia('(max-width: 767px)').matches
    const distance = mobile ? 36 : 58
    const x = direction === 'left' ? -distance : direction === 'right' ? distance : 0
    const y = direction === 'up' ? distance : 0

    // Keep the observed box in its layout position until it enters the viewport.
    controls.set({ opacity: 0.12 })
    const finish = () => {
      controls.stop()
      controls.set({ opacity: 1, x: 0, y: 0 })
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      if (preference.matches) {
        finish()
        return
      }
      void controls.start({
        opacity: [0.12, 1],
        x: [x, 0],
        y: [y, 0],
        transition: { delay, duration: 0.78, ease: [0.25, 0.65, 0.3, 1] },
      }).catch(finish)
    }, { threshold: 0.12, rootMargin: '-60px 0px 0px' })

    const showImmediately = () => {
      observer.disconnect()
      finish()
    }
    const reduce = () => {
      if (preference.matches) showImmediately()
    }
    observer.observe(node)
    node.addEventListener('focusin', showImmediately)
    preference.addEventListener('change', reduce)
    return () => {
      observer.disconnect()
      node.removeEventListener('focusin', showImmediately)
      preference.removeEventListener('change', reduce)
      finish()
    }
  }, [controls, delay, direction])

  return <Component ref={(node: HTMLElement | null) => { element.current = node }} className={className} initial={false} animate={controls}>{children}</Component>
}
