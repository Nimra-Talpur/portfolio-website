import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useEffect } from 'react'

export default function App() {
 useEffect(() => {
  const applyObserver = () => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.05 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return observer
  }

  // Run immediately
  const observer = applyObserver()

  // Also run after a short delay to catch dynamically loaded content
  const timer = setTimeout(() => {
    observer.disconnect()
    applyObserver()
  }, 1000)

  return () => {
    clearTimeout(timer)
    observer.disconnect()
  }
}, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}