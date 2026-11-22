import { MotionConfig } from 'framer-motion'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Stack } from './components/Stack'
import { Projects } from './components/Projects'
import { Lab } from './components/Lab'
import { Athena } from './components/Athena'
import { Activity } from './components/Activity'
import { Journey } from './components/Journey'
import { Roadmap } from './components/Roadmap'
import { Contact, Footer } from './components/Contact'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="noise relative">
        <Nav />
        <main id="main">
          <Hero />
          <About />
          <Stack />
          <Projects />
          <Lab />
          <Athena />
          <Activity />
          <Journey />
          <Roadmap />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
