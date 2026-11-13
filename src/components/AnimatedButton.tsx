import { ArrowDown, ArrowUpRight, Download, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

export function AnimatedButton({ children, href, variant = 'primary', icon, external, download }: {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'secondary'
  icon?: LucideIcon
  external?: boolean
  download?: boolean
}) {
  const Icon = icon ?? (download ? Download : external ? ArrowUpRight : ArrowDown)
  const className = `action button button--${variant}`
  const content = <>{children}<Icon size={17} aria-hidden="true" /></>

  return href
    ? <a className={className} href={href} download={download} target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}>{content}</a>
    : <span className={className} data-unavailable>{content}</span>
}
