import { useState, useEffect } from 'react'
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart,
  LayoutDashboard,
  Activity,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Bell
} from 'lucide-react'
import './CaretakerLayout.css'

export default function CaretakerLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [user] = useState(() => JSON.parse(localStorage.getItem('vatsalya_auth')))

  useEffect(() => {
    if (!user || !user.isLoggedIn || user.role !== 'caretaker') {
      navigate('/auth')
    }
  }, [user, navigate])

  const handleLogout = () => {
    localStorage.removeItem('vatsalya_auth')
    navigate('/auth')
  }

  const navLinks = [
    { to: '/caretaker/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/caretaker/activity', icon: Activity, label: 'Daily Activity' },
    { to: '/caretaker/health', icon: Users, label: 'Healthcare Services' },
    { to: '/caretaker/settings', icon: Settings, label: 'Settings' }
  ]

  // Close mobile menu on route change
  useEffect(() => {
    // setIsMobileOpen(false) // Handled differently to avoid cascading renders
  }, [location.pathname])

  if (!user) return null // or a loading spinner

  return (
    <div className="caretaker-layout">
      {/* --- SIDEBAR --- */}
      <aside className={`sidebar ${isMobileOpen ? 'sidebar--mobile-open' : ''}`}>
        <div className="sidebar__header">
          <div className="sidebar__logo" onClick={() => navigate('/caretaker/dashboard')}>
            <div className="sidebar__logo-icon">
              <Heart size={20} fill="#fff" />
            </div>
            <span className="sidebar__logo-text">Vatsalya</span>
          </div>
          <button className="sidebar__close-btn" onClick={() => setIsMobileOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar__nav">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
            >
              <link.icon size={20} />
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__footer">
          <div className="sidebar__user">
            <div className="sidebar__avatar">{user?.name?.charAt(0) || 'C'}</div>
            <div className="sidebar__user-info">
              <span className="sidebar__user-name">{user?.name}</span>
              <span className="sidebar__user-role">Caretaker</span>
            </div>
          </div>
          <button className="sidebar__logout" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* --- OVERLAY FOR MOBILE --- */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* --- MAIN CONTENT --- */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <button className="topbar__menu-btn" onClick={() => setIsMobileOpen(true)}>
            <Menu size={24} />
          </button>

          <div className="topbar__right">
            <button className="topbar__notification">
              <Bell size={20} />
              <span className="topbar__badge">3</span>
            </button>
            <div className="topbar__parent-id">
              ID: <strong>{user?.parentId || 'N/A'}</strong>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
