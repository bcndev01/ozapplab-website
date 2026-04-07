import { useContext, useRef, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Calendar, Grid3X3, SlidersHorizontal, Zap, Camera, Award, Cloud, Globe,
  Download, ChevronLeft, ChevronRight, ArrowRight, Shield, Star
} from 'lucide-react'
import { DataContext } from '../App'
import PageWrapper from '../components/PageWrapper'

const ICON_MAP = {
  calendar: Calendar, grid: Grid3X3, sliders: SlidersHorizontal, zap: Zap,
  camera: Camera, award: Award, cloud: Cloud, globe: Globe,
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06 + 0.2, duration: 0.5, ease: [0.25, 0.1, 0, 1] }
  })
}

export default function AppPage() {
  const { appId } = useParams()
  const data = useContext(DataContext)
  const app = data?.apps.find(a => a.id === appId)
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const check = () => {
      setCanScrollLeft(el.scrollLeft > 10)
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
    }
    check()
    el.addEventListener('scroll', check)
    return () => el.removeEventListener('scroll', check)
  }, [app])

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 280, behavior: 'smooth' })
  }

  if (!app) {
    return (
      <PageWrapper className="text-center py-32 px-6">
        <h1 className="text-3xl font-bold mb-4">App not found</h1>
        <Link to="/" className="text-accent">Go home</Link>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      {/* === HERO === */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Ambient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent/[0.06] rounded-full blur-[180px] animate-mesh" />
          <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-cyan/[0.04] rounded-full blur-[120px] animate-mesh-slow" />
          <div className="absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="text-center px-6 max-w-4xl mx-auto pt-20">
          {/* Icon with glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 150 }}
            className="relative inline-block mb-10"
          >
            <div className="absolute inset-0 bg-accent/25 rounded-[34px] blur-3xl animate-float" />
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-[34px] bg-dark-700 overflow-hidden shadow-2xl ring-1 ring-white/[0.08]">
              <img src={`/${app.icon}`} alt={app.name} className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-accent/20 to-cyan/20 flex items-center justify-center text-5xl font-bold text-accent">' + app.name[0] + '</div>'
                }} />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-5 leading-[1.05]"
          >
            <span className="bg-gradient-to-r from-accent via-cyan to-accent bg-clip-text text-transparent bg-[length:200%]">
              {app.fullTitle}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="text-text-secondary text-lg md:text-xl mb-12"
          >
            {app.heroSubtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href={app.appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-white text-black pl-5 pr-7 py-3.5 rounded-2xl font-semibold hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,255,255,0.12)] transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span className="flex flex-col items-start leading-tight">
                <span className="text-[11px] font-normal opacity-60">Download on the</span>
                <span className="text-[18px] font-semibold -mt-0.5">App Store</span>
              </span>
            </a>

            <a href="#features" className="px-7 py-3.5 rounded-2xl text-sm font-semibold text-text-secondary border border-border hover:border-border-light hover:text-text-primary transition-all duration-300">
              See Features
            </a>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark-950 to-transparent" />
      </section>

      {/* === SCREENSHOTS CAROUSEL === */}
      {app.screenshots?.length > 0 && (
        <section className="py-16 relative">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">Screenshots</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => scroll(-1)}
                  disabled={!canScrollLeft}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-white/[0.03] transition-all disabled:opacity-20"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => scroll(1)}
                  disabled={!canScrollRight}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-white/[0.03] transition-all disabled:opacity-20"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div ref={scrollRef} className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4">
              {app.screenshots.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * i + 0.2 }}
                  className="flex-shrink-0 w-[240px] md:w-[260px] snap-center"
                >
                  <div className="rounded-2xl overflow-hidden border border-border bg-dark-800 shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:border-border-light transition-all duration-400">
                    <img src={`/${src}`} alt={`Screenshot ${i + 1}`} className="w-full"
                      onError={(e) => {
                        e.target.parentElement.innerHTML = '<div class="aspect-[9/19.5] bg-gradient-to-br from-dark-700 to-dark-800 flex items-center justify-center text-text-muted text-sm">Screenshot ' + (i + 1) + '</div>'
                      }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === FEATURES GRID === */}
      <section id="features" className="py-24 px-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.03] rounded-full blur-[150px] -z-10" />

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-accent text-sm font-semibold tracking-wider uppercase">Features</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 tracking-tight">Everything you need</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {app.features.map((f, i) => {
              const Icon = ICON_MAP[f.icon] || Globe
              return (
                <motion.div
                  key={i}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="group glass-card rounded-2xl p-6 hover:-translate-y-1 cursor-default"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/[0.07] border border-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/15 group-hover:border-accent/20 group-hover:shadow-[0_0_20px_rgba(74,222,128,0.1)] transition-all duration-400">
                    <Icon size={22} className="text-accent" />
                  </div>
                  <h3 className="font-bold text-[15px] mb-1.5">{f.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{f.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* === BOTTOM CTA === */}
      <section className="pb-28 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.06] to-cyan/[0.04] rounded-3xl blur-xl" />
          <div className="relative glass-card rounded-3xl p-10 md:p-14 text-center overflow-hidden">
            {/* Corner decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/[0.05] rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan/[0.04] rounded-full blur-2xl" />

            <div className="relative">
              <Star size={28} className="text-accent mx-auto mb-5 fill-accent/20" />
              <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">Ready to play?</h2>
              <p className="text-text-secondary mb-8 max-w-md mx-auto">
                Download {app.name} for free and start solving puzzles today
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={app.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-accent text-dark-950 px-8 py-4 rounded-xl font-bold hover:shadow-[0_0_30px_rgba(74,222,128,0.3)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Download size={18} /> Download Free
                </a>
                <Link
                  to={`/${appId}/support`}
                  className="flex items-center gap-2 text-text-secondary text-sm font-semibold hover:text-text-primary transition-colors"
                >
                  <Shield size={16} /> Privacy & Support <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  )
}
