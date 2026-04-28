import { motion } from 'framer-motion'
import {
  User,
  Bell,
  Shield,
  Smartphone,
  Globe,
  HelpCircle,
  LogOut,
  ChevronRight,
  ToggleLeft,
  ToggleRight
} from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CaretakerSettings.css'

export default function CaretakerSettings() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState(true)
  const [smsAlerts, setSmsAlerts] = useState(true)
  const [locationTracking, setLocationTracking] = useState(true)

  const handleLogout = () => {
    localStorage.removeItem('vatsalya_auth')
    navigate('/auth')
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }

  return (
    <motion.div 
      className="settings-page"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <header className="settings-page__header">
        <h1 className="settings-page__title">Settings</h1>
        <p className="settings-page__subtitle">Manage your preferences and account</p>
      </header>

      <div className="settings-page__grid">
        
        {/* --- LEFT COLUMN --- */}
        <div className="settings-page__col-main">
          
          <motion.section className="settings-section card" variants={itemVariants}>
            <h2 className="settings-section__title">Account</h2>
            <div className="settings-list">
              <div className="settings-item">
                <div className="settings-item__icon"><User size={20} /></div>
                <div className="settings-item__info">
                  <h3>Personal Information</h3>
                  <p>Update your name, email, and phone</p>
                </div>
                <ChevronRight size={20} className="text-muted" />
              </div>
              <div className="settings-item">
                <div className="settings-item__icon"><Shield size={20} /></div>
                <div className="settings-item__info">
                  <h3>Password & Security</h3>
                  <p>Change password and 2FA settings</p>
                </div>
                <ChevronRight size={20} className="text-muted" />
              </div>
            </div>
          </motion.section>

          <motion.section className="settings-section card" variants={itemVariants}>
            <h2 className="settings-section__title">Notifications & Alerts</h2>
            <div className="settings-list">
              <div className="settings-item">
                <div className="settings-item__icon"><Bell size={20} /></div>
                <div className="settings-item__info">
                  <h3>Push Notifications</h3>
                  <p>Receive alerts on your device</p>
                </div>
                <button 
                  className="settings-toggle"
                  onClick={() => setNotifications(!notifications)}
                >
                  {notifications ? <ToggleRight size={32} color="#1A3CFF" /> : <ToggleLeft size={32} color="#9CA3AF" />}
                </button>
              </div>
              <div className="settings-item">
                <div className="settings-item__icon"><Smartphone size={20} /></div>
                <div className="settings-item__info">
                  <h3>SMS Emergency Alerts</h3>
                  <p>Critical SOS alerts via SMS</p>
                </div>
                <button 
                  className="settings-toggle"
                  onClick={() => setSmsAlerts(!smsAlerts)}
                >
                  {smsAlerts ? <ToggleRight size={32} color="#1A3CFF" /> : <ToggleLeft size={32} color="#9CA3AF" />}
                </button>
              </div>
            </div>
          </motion.section>

          <motion.section className="settings-section card" variants={itemVariants}>
            <h2 className="settings-section__title">Privacy</h2>
            <div className="settings-list">
              <div className="settings-item">
                <div className="settings-item__icon"><Globe size={20} /></div>
                <div className="settings-item__info">
                  <h3>Location Tracking</h3>
                  <p>Allow continuous location sharing</p>
                </div>
                <button 
                  className="settings-toggle"
                  onClick={() => setLocationTracking(!locationTracking)}
                >
                  {locationTracking ? <ToggleRight size={32} color="#1A3CFF" /> : <ToggleLeft size={32} color="#9CA3AF" />}
                </button>
              </div>
            </div>
          </motion.section>

        </div>

        {/* --- RIGHT COLUMN --- */}
        <div className="settings-page__col-side">
          
          <motion.div className="card parent-link-card" variants={itemVariants}>
            <h3 className="card-title">Linked Parent</h3>
            <div className="linked-profile">
              <div className="linked-profile__avatar">AM</div>
              <div>
                <h4>Arthur Miller</h4>
                <span>ID: VSY-2024-66359</span>
              </div>
            </div>
            <button className="btn btn-outline btn-full mt-4">Manage Access</button>
          </motion.div>

          <motion.div className="settings-links" variants={itemVariants}>
            <button className="settings-link-btn">
              <HelpCircle size={20} /> Help & Support
            </button>
            <button className="settings-link-btn text-danger" onClick={handleLogout}>
              <LogOut size={20} /> Logout
            </button>
          </motion.div>

        </div>
      </div>
    </motion.div>
  )
}
