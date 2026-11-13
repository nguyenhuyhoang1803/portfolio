import { ArrowUpRight, ScanFace } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AnimatedButton } from '../components/AnimatedButton'
import { MediaPlaceholder } from '../components/MediaPlaceholder'
import { Reveal } from '../components/Reveal'
import { channels } from '../data/channels'
import { localMedia, profile } from '../data/portfolio'

function BackgroundVideo() {
  const [enabled, setEnabled] = useState(false)
  const [failed, setFailed] = useState(false)
  const [playing, setPlaying] = useState(false)
  const src = localMedia(profile.video)

  useEffect(() => {
    if (!src) return
    const media = matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)')
    const update = () => {
      setEnabled(media.matches)
      if (!media.matches) setPlaying(false)
    }
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [src])

  if (!src || !enabled || failed) return null
  return (
    <div className="hero-video" data-playing={playing} aria-hidden="true">
      <video src={src} poster={localMedia(profile.poster)} autoPlay muted loop playsInline
        preload="metadata" onPlaying={() => setPlaying(true)} onError={() => setFailed(true)} />
    </div>
  )
}

export function About() {
  const cv = localMedia(profile.cv) ?? localMedia(profile.cvFallback)
  const careers = channels.filter(({ href, label }) => href && ['LinkedIn', 'GitHub'].includes(label))

  return (
    <section id="about" className="hero" aria-labelledby="about-title">
      <BackgroundVideo />
      <div className="shell hero-layout">
        <div className="hero-masthead" aria-hidden="true">
          <Reveal className="masthead-reveal">PORTFOLIO</Reveal>
        </div>
        <div className="hero-copy">
          <div>
            <p className="section-label">01 / About</p>
            <h1 id="about-title">
              <Reveal as="span" className="reveal-line" delay={0.16}>{profile.name.split(' ')[0]}</Reveal>{' '}
              <Reveal as="span" className="reveal-line" delay={0.26}>{profile.name.split(' ').slice(1).join(' ')}</Reveal>
            </h1>
            <p className="hero-role">{profile.role}</p>
            <p className="hero-intro">{profile.description}</p>
          </div>
          <div>
            <div className="flex flex-wrap gap-3">
              <Reveal delay={0.32}><AnimatedButton href="#projects">Explore My Work</AnimatedButton></Reveal>
              {cv && <Reveal delay={0.42}><AnimatedButton href={cv} variant="secondary" download>Download CV</AnimatedButton></Reveal>}
            </div>
            {careers.length > 0 && <Reveal delay={0.5} className="career-links">
              {careers.map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                  {label}<ArrowUpRight size={15} aria-hidden="true" />
                </a>
              ))}
            </Reveal>}
          </div>
        </div>
        <Reveal delay={0.1} className="portrait-wrap">
          <div className="portrait-frame">
            <MediaPlaceholder src={localMedia(profile.portrait)} alt={profile.name} eager fallback={
              <div className="portrait-placeholder">
                <ScanFace size={38} strokeWidth={1.4} aria-hidden="true" />
                <span>Portrait coming soon</span>
              </div>
            } />
          </div>
        </Reveal>
      </div>
      <div className="shell identity-strip">
        <Reveal direction="left" className="identity-cell">
          <strong>{profile.name}</strong><span>Developer Portfolio</span>
        </Reveal>
        <Reveal direction="left" delay={0.07} className="identity-cell identity-focus">
          <p>Interested in backend systems, APIs, databases, and practical web applications.</p>
        </Reveal>
        <Reveal direction="left" delay={0.14} className="identity-cell">
          <strong>Based in Vietnam</strong><span>Open to Remote Opportunities</span>
        </Reveal>
        <Reveal direction="left" delay={0.21} className="identity-cell identity-tags">
          <span>Backend-focused</span><span>Graduation Thesis</span>
        </Reveal>
      </div>
    </section>
  )
}
