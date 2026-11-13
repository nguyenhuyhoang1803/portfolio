import { ArrowUpRight, ScanFace } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AnimatedButton } from '../components/AnimatedButton'
import { MediaPlaceholder } from '../components/MediaPlaceholder'
import { FadeUp, RevealImage, RevealText, StaggerContainer } from '../components/Reveal'
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
          <RevealText intro className="masthead-reveal">PORTFOLIO</RevealText>
        </div>
        <div className="hero-copy">
          <div>
            <p className="section-label">01 / About</p>
            <h1 id="about-title">
              <RevealText intro as="span" className="reveal-line" delay={0.16}>{profile.name.split(' ')[0]}</RevealText>{' '}
              <RevealText intro as="span" className="reveal-line" delay={0.26}>{profile.name.split(' ').slice(1).join(' ')}</RevealText>
            </h1>
            <FadeUp intro delay={0.31}><p className="hero-role">{profile.role}</p></FadeUp>
            <FadeUp intro delay={0.41}><p className="hero-intro">{profile.description}</p></FadeUp>
          </div>
          <div>
            <div className="flex flex-wrap gap-3">
              <FadeUp intro delay={0.5}><AnimatedButton href="#projects">Explore My Work</AnimatedButton></FadeUp>
              {cv && <FadeUp intro delay={0.62}><AnimatedButton href={cv} variant="secondary" download>Download CV</AnimatedButton></FadeUp>}
            </div>
            {careers.length > 0 && <FadeUp intro delay={0.68} className="career-links">
              {careers.map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                  {label}<ArrowUpRight size={15} aria-hidden="true" />
                </a>
              ))}
            </FadeUp>}
          </div>
        </div>
        <RevealImage intro delay={0.1} className="portrait-wrap">
          <div className="portrait-frame">
            <MediaPlaceholder src={localMedia(profile.portrait)} alt={profile.name} eager fallback={
              <div className="portrait-placeholder">
                <ScanFace size={38} strokeWidth={1.4} aria-hidden="true" />
                <span>Portrait coming soon</span>
              </div>
            } />
          </div>
        </RevealImage>
      </div>
      <div className="shell identity-strip">
        <StaggerContainer>{(delayFor) => <>
        <FadeUp delay={delayFor(0)} className="identity-cell">
          <strong>{profile.name}</strong><span>Developer Portfolio</span>
        </FadeUp>
        <FadeUp delay={delayFor(1)} className="identity-cell identity-focus">
          <p>Interested in backend systems, APIs, databases, and practical web applications.</p>
        </FadeUp>
        <FadeUp delay={delayFor(2)} className="identity-cell">
          <strong>Based in Vietnam</strong><span>Open to Remote Opportunities</span>
        </FadeUp>
        <FadeUp delay={delayFor(3)} className="identity-cell identity-tags">
          <span>Backend-focused</span><span>Graduation Thesis</span>
        </FadeUp>
        </>}</StaggerContainer>
      </div>
    </section>
  )
}
