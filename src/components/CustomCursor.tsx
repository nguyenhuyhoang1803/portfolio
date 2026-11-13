import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const cursor = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ring = cursor.current
    if (!ring) return
    const preference = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    let frame = 0
    let x = 0
    let y = 0
    let targetX = 0
    let targetY = 0

    const tick = () => {
      x += (targetX - x) * 0.36
      y += (targetY - y) * 0.36
      ring.style.translate = `${x}px ${y}px`
      frame = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.15
        ? requestAnimationFrame(tick)
        : 0
    }
    const hide = () => {
      ring.dataset.visible = 'false'
      cancelAnimationFrame(frame)
      frame = 0
    }
    const move = (event: PointerEvent) => {
      if (!preference.matches || event.pointerType !== 'mouse') return
      targetX = event.clientX
      targetY = event.clientY
      if (ring.dataset.visible !== 'true') {
        x = targetX
        y = targetY
        ring.style.translate = `${x}px ${y}px`
      }
      ring.dataset.visible = 'true'
      ring.dataset.interactive = String(event.target instanceof Element &&
        Boolean(event.target.closest('a, button:not(:disabled), summary')))
      if (!frame) frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', hide)
    window.addEventListener('blur', hide)
    preference.addEventListener('change', hide)
    return () => {
      hide()
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', hide)
      window.removeEventListener('blur', hide)
      preference.removeEventListener('change', hide)
    }
  }, [])

  return <div ref={cursor} className="cursor-ring" aria-hidden="true" />
}
