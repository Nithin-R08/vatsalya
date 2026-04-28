import { Outlet, useNavigate } from 'react-router-dom'
import { Heart, LogOut, Globe } from 'lucide-react'
import './ParentLayout.css'

export default function ParentLayout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('vatsalya_auth')
    navigate('/auth')
  }

  return (
    <div className="parent-layout">
      {/* Topbar */}
      <header className="parent-topbar">
        <div className="parent-topbar__brand" onClick={() => navigate('/parent/dashboard')}>
          <div className="parent-topbar__icon">
            <Heart size={24} fill="#fff" />
          </div>
          <span className="parent-topbar__title">Vatsalya</span>
        </div>
        
        <div className="parent-topbar__actions">
          <button className="parent-topbar__btn" aria-label="Change Language">
            <Globe size={24} />
            <span>English</span>
          </button>
          <button className="parent-topbar__btn text-danger" onClick={handleLogout} aria-label="Logout">
            <LogOut size={24} />
            <span>Exit</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="parent-main">
        <Outlet />
      </main>
    </div>
  )
}
