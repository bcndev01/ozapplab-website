import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import { DataContext } from '../App'
import PageWrapper from '../components/PageWrapper'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0, 1] } }
}

export default function Home() {
  const data = useContext(DataContext)

  return (
    <PageWrapper>
      {/* === HERO with mesh gradient === */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Mesh bg blobs */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] bg-accent/[0.07] rounded-full blur-[150px] animate-mesh" />
          <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] bg-cyan/[0.05] rounded-full blur-[130px] animate-mesh-slow" />
          <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] bg-purple/[0.04] rounded-full blur-[120px] animate-mesh" />
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        <div className="text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent/[0.06] border border-accent/10 text-accent text-sm font-medium mb-10 backdrop-blur-sm"
          >
            <Star size={13} className="fill-accent" />
            Independent iOS Developer
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-8"
          >
            <span className="bg-gradient-to-b from-white via-white/90 to-white/40 bg-clip-text text-transparent">
              {data.studio.name}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-text-secondary text-lg md:text-xl max-w-md mx-auto mb-12 leading-relaxed"
          >
            Crafting beautiful mobile experiences with passion and precision
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex items-center justify-center gap-4"
          >
            <a href="#apps" className="group flex items-center gap-2 px-7 py-3.5 bg-accent text-dark-950 rounded-xl font-semibold text-sm hover:shadow-[0_0_30px_rgba(74,222,128,0.3)] transition-all duration-300 hover:-translate-y-0.5">
              Explore Apps
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a href={`mailto:${data.studio.email}`} className="px-7 py-3.5 rounded-xl text-sm font-semibold text-text-secondary border border-border hover:border-border-light hover:text-text-primary transition-all duration-300">
              Contact
            </a>
          </motion.div>

        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-950 to-transparent" />
      </section>

      {/* === APP CARDS === */}
      <section id="apps" className="px-6 py-24 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-accent text-sm font-semibold tracking-wider uppercase">Portfolio</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 tracking-tight">Our Apps</h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-6"
          >
            {data.apps.map((app) => (
              <motion.div key={app.id} variants={item}>
                <Link
                  to={`/${app.id}`}
                  className="group relative block rounded-3xl overflow-hidden"
                >
                  {/* Card bg with gradient border */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/10 via-transparent to-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative glass-card rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
                    {/* App icon */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-accent/20 rounded-[28px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-[28px] bg-dark-700 overflow-hidden shadow-2xl ring-1 ring-white/[0.05] group-hover:ring-accent/20 transition-all duration-500 group-hover:scale-105">
                        <img src={app.icon} alt={app.name} className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-accent/20 to-cyan/20 flex items-center justify-center text-3xl font-bold text-accent">' + app.name[0] + '</div>'
                          }} />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                        {app.fullTitle}
                      </h3>
                      <p className="text-text-secondary leading-relaxed mb-5 max-w-lg">
                        {app.shortDescription}
                      </p>

                      {/* Feature pills */}
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                        {app.features.slice(0, 4).map((f, i) => (
                          <span key={i} className="px-3 py-1 rounded-full bg-white/[0.03] border border-border text-text-muted text-xs font-medium">
                            {f.title}
                          </span>
                        ))}
                        <span className="px-3 py-1 rounded-full bg-accent-dim border border-accent/10 text-accent text-xs font-medium">
                          +{app.features.length - 4} more
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-2 text-accent text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                        View Details <ArrowRight size={16} />
                      </span>
                    </div>

                    {/* Decorative corner glow */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/[0.03] rounded-full blur-3xl group-hover:bg-accent/[0.08] transition-all duration-700" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}

