import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { channels } from '../data/channels'
import { contact } from '../data/portfolio'

export function Contact() {
  const links = channels.filter(({ href }) => href)

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="shell contact-layout">
        <div className="heading-clip">
          <h2 id="contact-title">
            <Reveal as="span" className="reveal-line">Let’s</Reveal>{' '}
            <Reveal as="span" className="reveal-line" delay={0.11}><em>Build</em></Reveal>{' '}
            <Reveal as="span" className="reveal-line" delay={0.22}>Together</Reveal>
          </h2>
        </div>
        <div>
          <p className="section-label">03 / Contact</p>
          <p className="contact-description">{contact.description}</p>
          <ul className="contact-list">
            {links.map(({ label, Icon, href, external }, index) => (
              <li key={label}>
                <Reveal direction="right" delay={0.09 + index * 0.06}>
                <a className="contact-row action" href={href} target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}>
                  <Icon size={17} aria-hidden="true" />
                  <span>{external ? label : contact.email}</span>
                  <ArrowUpRight className="contact-arrow" size={17} aria-hidden="true" />
                </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
