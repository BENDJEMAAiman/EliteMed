import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import Modules from '../components/home/Modules'
import Testimonials from '../components/home/Testimonials'
import '../styles/home.css'

export default function HomePage() {
  const { hash } = useLocation()

  // Scroll vers #modules quand on arrive via /#modules
  useEffect(() => {
    if (!hash) return
    document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
  }, [hash])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Modules />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}
