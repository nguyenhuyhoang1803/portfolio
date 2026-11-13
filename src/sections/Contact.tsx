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
          <Reveal>
            <h2 id="contact-title">Let’s <em>Build</em> Together</h2>
          </Reveal>
        </div>
        <Reveal delay={0.12}>
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
        </Reveal>
      </div>
    </section>
  )
}
