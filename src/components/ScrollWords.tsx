import { Fragment, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { previewMotion } from './motionPreview'

function Word({ word, progress, start }: { word: string; progress: MotionValue<number>; start: number }) {
  const opacity = useTransform(progress, [start, start + 0.22], [0.45, 1])
  return <motion.span style={{ opacity }}>{word}</motion.span>
}

export function ScrollWords({ text }: { text: string }) {
  const target = useRef<HTMLParagraphElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target, offset: ['start 0.94', 'start 0.63'] })
  const words = text.split(' ')

  return (
    <p ref={target} className="personal-statement">
      {reduced && !previewMotion ? text : <>
        <span className="sr-only">{text}</span>
        <span aria-hidden="true">
          {words.map((word, index) => (
            <Fragment key={index}>
              {index > 0 && ' '}
              <Word word={word} progress={scrollYProgress} start={0.78 * index / Math.max(1, words.length - 1)} />
            </Fragment>
          ))}
        </span>
      </>}
    </p>
  )
}
