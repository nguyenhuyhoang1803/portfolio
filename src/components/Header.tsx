import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { profile } from '../data/portfolio'

const links = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export function Header() {
  const [active, setActive] = useState('about')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const header = useRef<HTMLElement>(null)
  const progress = useRef<HTMLDivElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const sections = links.map(({ id }) => document.getElementById(id))
    let frame = 0
    const update = () => {
      frame = 0
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const fraction = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0
      if (progress.current) progress.current.style.transform = `scaleX(${fraction})`
      setScrolled(window.scrollY > 8)
      const marker = (header.current?.offsetHeight ?? 72) + 32
      const atBottom = window.scrollY > 0 &&
        Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight
      const current = sections.findLast((section) => section && section.getBoundingClientRect().top <= marker)
      setActive(atBottom ? 'contact' : current?.id ?? 'about')
    }
    update()
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return (
    <header ref={header} className="header" data-scrolled={scrolled} onKeyDown={(event) => {
      if (event.key === 'Escape' && open) {
        setOpen(false)
        toggle.current?.focus()
      }
    }}>
      <div ref={progress} className="reading-progress" aria-hidden="true" />
      <div className="shell header-inner">
        <a href="#about" className="wordmark" onClick={() => setOpen(false)}>
          <strong aria-hidden="true">NHH<b>/</b></strong>
          <span>{profile.name}</span>
        </a>
        <button ref={toggle} className="menu-toggle action" type="button" aria-expanded={open}
          aria-controls="main-nav" aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
        <nav id="main-nav" aria-label="Main navigation" data-open={open}>
          {links.map(({ id, label }) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}
              onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>
      </div>
    </header>
  )
}
