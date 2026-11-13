import { ArrowUpRight, ChevronLeft, ChevronRight, GitFork, PanelsTopLeft, Route, FileText } from 'lucide-react'
import { useState } from 'react'
import { AnimatedButton } from '../components/AnimatedButton'
import { MediaPlaceholder } from '../components/MediaPlaceholder'
import { Reveal } from '../components/Reveal'
import { localMedia, profile, project, webLink } from '../data/portfolio'

const process = ['Discover', 'Structure', 'Build', 'Test', 'Improve']

const gallery = [
  { src: localMedia(project.cover), alt: `${project.title} project cover` },
  ...project.screenshots
    .map((image) => ({ ...image, src: localMedia(image.src) }))
    .filter(({ src }) => src)
    .slice(0, 2),
].filter(({ src }) => src)

export function Projects() {
  const [selected, setSelected] = useState(0)
  const image = gallery[selected]
  const demo = webLink(project.demoUrl)
  const repository = webLink(project.repositoryUrl)
  const caseStudy = [
    ['Problem', project.caseStudy?.problem],
    ['My Contribution', project.caseStudy?.contribution],
    ['Solution', project.caseStudy?.solution],
    ['Result & Evidence', project.caseStudy?.result],
  ].filter(([, content]) => content)
  const details = caseStudy.length > 0 || project.role || project.stack.length > 0 || project.highlights.length > 0

  return (
    <section id="projects" className="projects" aria-labelledby="projects-title">
      <div className="shell">
        <Reveal><h2 id="projects-title" className="section-label">02 / Selected Work</h2></Reveal>
        <article className="project-layout" aria-labelledby="project-name">
          <div className="project-copy min-w-0">
              <p className="project-category section-label">{project.category}</p>
              <h3 id="project-name" className="heading-clip"><Reveal as="span" className="reveal-line" delay={0.12}>{project.title.slice(0, -6)}<span className="project-accent">{project.title.slice(-6)}</span></Reveal></h3>
              <Reveal direction="right" delay={0.22}><p className="project-description">{project.description}</p></Reveal>

              <details id="internbridge-case-study" className="project-details">
                <summary>Explore the Project <ArrowUpRight size={17} aria-hidden="true" /></summary>
                {details ? <>
                {caseStudy.length > 0 && <dl>
                  {caseStudy.map(([label, content]) => <div key={label}><dt>{label}</dt><dd>{content}</dd></div>)}
                </dl>}
                {(project.role || project.stack.length > 0) && <dl>
                  {project.role && <><dt>My Role</dt><dd>{project.role}</dd></>}
                  {project.stack.length > 0 && <><dt>Tech Stack</dt><dd>{project.stack.join(', ')}</dd></>}
                </dl>}
                {project.highlights.length > 0 && <>
                  <h4>Project Highlights</h4>
                  <ul>{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
                </>}
                </> : <p className="project-note">The full case study is coming soon.</p>}
              </details>
            {(demo || repository) && <div className="mt-5 flex flex-wrap gap-3">
              {demo && <AnimatedButton href={demo} external icon={ArrowUpRight}>View Demo</AnimatedButton>}
              {repository && <AnimatedButton href={repository} external variant="secondary" icon={GitFork}>GitHub</AnimatedButton>}
            </div>}
          </div>
          <Reveal direction="left" delay={0.1} className="project-media min-w-0">
            <figure className="browser-frame">
              <div className="browser-screen">
                <MediaPlaceholder key={image?.src} src={image?.src} alt={image?.alt ?? ''} fallback={
                  <div className="project-placeholder">
                    <PanelsTopLeft size={34} strokeWidth={1.4} aria-hidden="true" />
                    <span>InternBridge screenshot coming soon</span>
                  </div>
                } />
              </div>
              {gallery.length > 1 && <figcaption className="gallery-controls">
                <button type="button" className="action" aria-label="Previous screenshot"
                  onClick={() => setSelected((selected + gallery.length - 1) % gallery.length)}><ChevronLeft size={20} /></button>
                <span aria-live="polite">{selected + 1} / {gallery.length}</span>
                <button type="button" className="action" aria-label="Next screenshot"
                  onClick={() => setSelected((selected + 1) % gallery.length)}><ChevronRight size={20} /></button>
              </figcaption>}
            </figure>
          </Reveal>
        </article>
        <div className="supporting-grid" aria-label="More from InternBridge">
          {[
            { title: 'Main Platform View', src: localMedia(project.cover), Icon: PanelsTopLeft },
            { title: 'Workflow Screenshot', src: localMedia(project.screenshots[0]?.src ?? ''), Icon: Route },
          ].map(({ title, src, Icon }, index) => (
            <Reveal className="support-item" key={title} delay={index * 0.08}>
              <figure>
                <div className="support-visual">
                  <MediaPlaceholder src={src} alt={title + ' of InternBridge'} fallback={
                    <div className="support-placeholder"><Icon size={24} aria-hidden="true" /><span>Image coming soon</span></div>
                  } />
                </div>
                <figcaption>{title}</figcaption>
              </figure>
            </Reveal>
          ))}
          <Reveal className="support-item" delay={0.16}>
            <a className="support-case" href="#internbridge-case-study" onClick={() => {
              const detail = document.querySelector<HTMLDetailsElement>('#internbridge-case-study')
              if (detail) detail.open = true
            }}>
              <div className="support-visual support-case-visual">
                <FileText size={24} aria-hidden="true" />
                <span>Problem → Solution → Result</span>
              </div>
              <span className="support-caption">InternBridge Case Study <ArrowUpRight size={16} aria-hidden="true" /></span>
            </a>
          </Reveal>
        </div>
        <div className="editorial-grid">
          <Reveal className="editorial-cell">
            <h3 className="section-label">01 / Education</h3>
            <p className="editorial-title">{profile.university}</p>
            <p>{profile.degree}</p>
            <p>Graduation Thesis · {project.title}</p>
          </Reveal>
          <Reveal className="editorial-cell" delay={0.09}>
            <h3 className="section-label">02 / Experience</h3>
            <p className="editorial-title">Academic Projects</p>
            <p>Backend-oriented development</p>
            <p>APIs, databases, debugging, and documentation</p>
          </Reveal>
          <Reveal className="editorial-cell" delay={0.18}>
            <h3 className="section-label">03 / Development Process</h3>
            <ol className="process-list">
              {process.map((step, index) => (
                <Reveal as="li" key={step} delay={0.2 + index * 0.09}>
                  <span aria-hidden="true">0{index + 1}</span>{step}
                </Reveal>
              ))}
            </ol>
          </Reveal>
        </div>
        <Reveal className="personal-statement"><p>{profile.statement}</p></Reveal>
      </div>
    </section>
  )
}
