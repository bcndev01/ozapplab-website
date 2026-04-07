import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { DataContext } from '../App'

export default function Footer() {
  const data = useContext(DataContext)
  const location = useLocation()
  const pathParts = location.pathname.split('/').filter(Boolean)
  const appId = pathParts[0]
  const app = data?.apps.find(a => a.id === appId)

  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-accent to-cyan flex items-center justify-center text-dark-950 font-black text-[10px]">O</div>
            <span className="text-sm text-text-muted">&copy; {data?.studio.copyright}</span>
          </div>

          <div className="flex items-center gap-6 flex-wrap justify-center">
            {app ? (
              <>
                <Link to={`/${appId}`} className="text-sm text-text-muted hover:text-text-secondary transition-colors">{app.name}</Link>
                <Link to={`/${appId}/privacy-policy`} className="text-sm text-text-muted hover:text-text-secondary transition-colors">Privacy</Link>
                <Link to={`/${appId}/terms`} className="text-sm text-text-muted hover:text-text-secondary transition-colors">Terms</Link>
                <Link to={`/${appId}/support`} className="text-sm text-text-muted hover:text-text-secondary transition-colors">Support</Link>
              </>
            ) : (
              <a href={`mailto:${data?.studio.email}`} className="text-sm text-text-muted hover:text-text-secondary transition-colors">{data?.studio.email}</a>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
