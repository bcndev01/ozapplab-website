import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState, createContext } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AppPage from './pages/AppPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import Support from './pages/Support'

export const DataContext = createContext(null)

export default function App() {
  const [data, setData] = useState(null)
  const location = useLocation()

  useEffect(() => {
    fetch('/apps.json')
      .then(r => r.json())
      .then(setData)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <DataContext.Provider value={data}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/:appId" element={<AppPage />} />
              <Route path="/:appId/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/:appId/terms" element={<Terms />} />
              <Route path="/:appId/support" element={<Support />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </DataContext.Provider>
  )
}
