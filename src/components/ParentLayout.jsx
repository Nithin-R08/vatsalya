import { Outlet, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Heart, LogOut, Globe } from 'lucide-react'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useTranslation } from 'react-i18next'
import './ParentLayout.css'

export default function ParentLayout() {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('vatsalya_auth')))
  
  const languages = ['en', 'hi', 'ta']
  const langLabels = { en: 'English', hi: 'हिंदी', ta: 'தமிழ்' }

  const handleLangToggle = () => {
    const currentLang = i18n.language || 'en'
    const currentIndex = languages.indexOf(currentLang)
    const nextLang = languages[(currentIndex + 1) % languages.length]
    i18n.changeLanguage(nextLang)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (!firebaseUser) {
        localStorage.removeItem('vatsalya_auth')
        navigate('/auth')
      } else if (!user || user.role !== 'parent') {
        navigate('/auth')
      } else {
        setUser(prev => ({ ...prev, isLoggedIn: true }))
      }
    })
    return () => unsubscribe()
  }, [user, navigate])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      localStorage.removeItem('vatsalya_auth')
      navigate('/auth')
    } catch (error) {
      console.error('Error logging out:', error)
    }
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
          <button className="parent-topbar__btn" onClick={handleLangToggle} aria-label="Change Language">
            <Globe size={24} />
            <span>{langLabels[i18n.language] || 'English'}</span>
          </button>
          <button className="parent-topbar__btn text-danger" onClick={handleLogout} aria-label="Logout">
            <LogOut size={24} />
            <span>{t('exit')}</span>
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
