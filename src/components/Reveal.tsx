import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { motion, useAnimationControls, useInView } from 'motion/react'
import { previewMotion } from './motionPreview'

type RevealProps = {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'span' | 'li'
  intro?: boolean
}

const easing = [0.22, 1, 0.36, 1] as const
const visible = { opacity: 1, x: 0, y: 0, clipPath: 'inset(-15% -5% -20% -5%)' }

function Reveal({ children, direction = 'up', delay = 0, className, as = 'div', intro = false, text = false }: RevealProps & {
  direction?: 'up' | 'left' | 'right'
  text?: boolean
}) {
  const element = useRef<HTMLElement>(null)
  const controls = useAnimationControls()
  const inactiveTarget = useRef<HTMLElement>(null)
  const canObserve = !intro && typeof IntersectionObserver !== 'undefined'
  const inView = useInView(canObserve ? element : inactiveTarget, { once: true, amount: 0.18, margin: '-55px 0px 0px 0px' })
  const finished = useRef(false)
  const Component = motion[as]

  useLayoutEffect(() => {
    const node = element.current
    if (!node || finished.current) return

    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    const finish = () => {
      finished.current = true
      controls.stop()
      controls.set({ opacity: 1, x: 0, y: 0, ...(text && { clipPath: 'none' }) })
    }
    if ((!previewMotion && preference.matches) || (!intro && typeof IntersectionObserver === 'undefined')) {
      finish()
      return
    }

    // Keep the observed element in its layout position before it enters the viewport.
    controls.set({ opacity: 0 })
    const reduce = () => {
      if (!previewMotion && preference.matches) finish()
    }
    preference.addEventListener('change', reduce)
    node.addEventListener('focusin', finish)

    if (intro || inView) {
      const mobile = matchMedia('(max-width: 768px)').matches
      const distance = direction === 'up' ? (mobile ? 20 : 36) : (mobile ? 24 : 55)
      const x = direction === 'left' ? -distance : direction === 'right' ? distance : 0
      const y = direction === 'up' ? distance : 0
      let active = true
      void controls.start({
        opacity: [0, 1],
        x: [x, 0],
        y: [y, 0],
        ...(text && { clipPath: ['inset(0% -5% 100% -5%)', visible.clipPath] }),
        transition: { delay, duration: mobile ? 0.72 : direction === 'up' ? 0.8 : 0.88, ease: easing },
      }).then(() => { if (active) finish() }, () => { if (active) finish() })
      return () => {
        active = false
        controls.stop()
        preference.removeEventListener('change', reduce)
        node.removeEventListener('focusin', finish)
      }
    }

    return () => {
      preference.removeEventListener('change', reduce)
      node.removeEventListener('focusin', finish)
    }
  }, [controls, delay, direction, intro, inView, text])

  return <Component ref={(node: HTMLElement | null) => { element.current = node }} className={className}
    initial={false} animate={controls}>{children}</Component>
}

export function FadeUp(props: RevealProps) {
  return <Reveal {...props} />
}

export function RevealText(props: RevealProps) {
  return <Reveal {...props} text />
}

export function SlideReveal(props: RevealProps & { direction: 'left' | 'right' }) {
  return <Reveal {...props} />
}

export function RevealImage({ direction, ...props }: RevealProps & { direction?: 'left' | 'right' }) {
  return direction ? <SlideReveal {...props} direction={direction} /> : <FadeUp {...props} />
}

export function StaggerContainer({ children, step = 0.12, delay = 0 }: {
  children: (delayFor: (index: number) => number) => ReactNode
  step?: number
  delay?: number
}) {
  return children((index) => delay + index * step)
}
