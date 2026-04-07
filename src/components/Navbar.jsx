import { Link, useLocation } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { DataContext } from '../App'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const data = useContext(DataContext)
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const pathParts = location.pathname.split('/').filter(Boolean)
  const appId = pathParts[0]
  const app = data?.apps.find(a => a.id === appId)
  const isAppPage = !!app

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-dark-950/70 backdrop-blur-2xl border-b border-border shadow-[0_4px_30px_rgba(0,0,0,0.3)]' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <Link to="/" className="group flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-cyan flex items-center justify-center text-dark-950 font-black text-sm">
            O
          </div>
          <span className="text-[15px] font-semibold text-text-primary group-hover:text-accent transition-colors">
            {data?.studio.name}
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {isAppPage ? (
            <>
              <NavLink to={`/${appId}`} current={location.pathname === `/${appId}`}>{app.name}</NavLink>
              <NavLink to={`/${appId}/privacy-policy`} current={location.pathname.includes('privacy')}>Privacy</NavLink>
              <NavLink to={`/${appId}/terms`} current={location.pathname.includes('terms')}>Terms</NavLink>
              <NavLink to={`/${appId}/support`} current={location.pathname.includes('support')}>Support</NavLink>
            </>
          ) : (
            <>
              <a href="#apps" className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-white/[0.03]">Apps</a>
              <a href={`mailto:${data?.studio.email}`} className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-white/[0.03]">Contact</a>
            </>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-text-secondary p-2 rounded-lg hover:bg-white/[0.05]">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-dark-950/95 backdrop-blur-2xl border-t border-border">
          <div className="px-6 py-5 flex flex-col gap-1">
            {isAppPage ? (
              <>
                <MobileLink to={`/${appId}`} onClick={() => setOpen(false)}>{app.name}</MobileLink>
                <MobileLink to={`/${appId}/privacy-policy`} onClick={() => setOpen(false)}>Privacy Policy</MobileLink>
                <MobileLink to={`/${appId}/terms`} onClick={() => setOpen(false)}>Terms of Use</MobileLink>
                <MobileLink to={`/${appId}/support`} onClick={() => setOpen(false)}>Support</MobileLink>
              </>
            ) : (
              <>
                <a href="#apps" onClick={() => setOpen(false)} className="px-4 py-3 text-sm text-text-secondary rounded-lg hover:bg-white/[0.03]">Apps</a>
                <a href={`mailto:${data?.studio.email}`} onClick={() => setOpen(false)} className="px-4 py-3 text-sm text-text-secondary rounded-lg hover:bg-white/[0.03]">Contact</a>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

function NavLink({ to, current, children }) {
  return (
    <Link to={to} className={`px-4 py-2 text-sm rounded-lg transition-all ${
      current ? 'text-accent bg-accent-dim' : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.03]'
    }`}>{children}</Link>
  )
}

function MobileLink({ to, onClick, children }) {
  return <Link to={to} onClick={onClick} className="px-4 py-3 text-sm text-text-secondary rounded-lg hover:bg-white/[0.03]">{children}</Link>
}
