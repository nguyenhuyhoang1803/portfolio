import { useState, type ReactNode } from 'react'

export function MediaPlaceholder({ src, alt, fallback, eager = false }: {
  src?: string
  alt: string
  fallback?: ReactNode
  eager?: boolean
}) {
  const [failed, setFailed] = useState<string>()

  return src && failed !== src
    ? <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async"
        onError={() => setFailed(src)} />
    : fallback
}
