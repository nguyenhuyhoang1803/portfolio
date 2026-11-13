import { useEffect, useRef, type ReactNode } from 'react'
import { motion, useAnimationControls } from 'motion/react'

type Direction = 'up' | 'left' | 'right'

export function Reveal({ children, direction = 'up', delay = 0, className }: {
  children: ReactNode
  direction?: Direction
  delay?: number
  className?: string
}) {
  const element = useRef<HTMLDivElement>(null)
  const controls = useAnimationControls()

  useEffect(() => {
    const node = element.current
    if (!node || typeof IntersectionObserver === 'undefined') return
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      if (preference.matches) return
      const mobile = matchMedia('(max-width: 767px)').matches
      const distance = direction === 'up' ? (mobile ? 22 : 46) : (mobile ? 24 : 56)
      controls.set({
        opacity: 0.05,
        x: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
        y: direction === 'up' ? distance : 0,
      })
      void controls.start({
        opacity: 1, x: 0, y: 0,
        transition: { delay, duration: 0.72, ease: [0.22, 1, 0.36, 1] },
      }).catch(() => controls.set({ opacity: 1, x: 0, y: 0 }))
    }, { threshold: 0.08 })

    observer.observe(node)
    const reduce = () => {
      if (!preference.matches) return
      controls.stop()
      controls.set({ opacity: 1, x: 0, y: 0 })
    }
    preference.addEventListener('change', reduce)
    return () => {
      observer.disconnect()
      preference.removeEventListener('change', reduce)
    }
  }, [controls, delay, direction])

  return <motion.div ref={element} className={className} initial={false} animate={controls}>{children}</motion.div>
}
