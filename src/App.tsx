import { CustomCursor } from './components/CustomCursor'
import { Header } from './components/Header'
import { profile } from './data/portfolio'
import { About } from './sections/About'
import { Projects } from './sections/Projects'
import { Contact } from './sections/Contact'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1}>
        <About />
        <Projects />
        <Contact />
      </main>
      <footer className="footer">
        <p className="shell">© {profile.copyrightYear} {profile.name}</p>
      </footer>
      <CustomCursor />
    </>
  )
}
