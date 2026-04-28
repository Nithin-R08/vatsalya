import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Heart,
  Activity,
  Phone,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  ChevronRight,
  TrendingUp,
  Moon,
  Coffee
} from 'lucide-react'
import './CaretakerDashboard.css'

export default function CaretakerDashboard() {
  const [heartRate, setHeartRate] = useState(72)
  const [spo2, setSpo2] = useState(94)

  // Simulate real-time vitals
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate(prev => {
        const delta = Math.floor(Math.random() * 5) - 2
        return Math.max(65, Math.min(85, prev + delta))
      })
      
      setSpo2(prev => {
        // SpO2 rarely changes rapidly, keep it stable
        if (Math.random() > 0.8) {
          const delta = Math.floor(Math.random() * 3) - 1
          return Math.max(92, Math.min(99, prev + delta))
        }
        return prev
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <motion.div 
      className="dashboard"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <header className="dashboard__header">
        <div>
          <h1 className="dashboard__title">Dashboard Overview</h1>
          <p className="dashboard__subtitle">Monitor Arthur's health and daily activity</p>
        </div>
        <button className="btn btn-emergency dashboard__sos-btn">
          <AlertTriangle size={18} /> Trigger SOS
        </button>
      </header>

      {/* --- TOP ROW --- */}
      <div className="dashboard__grid-top">
        {/* Profile Card */}
        <motion.div className="card profile-card" variants={itemVariants}>
          <div className="profile-card__header">
            <div className="profile-card__avatar">AM</div>
            <div>
              <h2 className="profile-card__name">Arthur Miller</h2>
              <p className="profile-card__age">Male, 81 years</p>
            </div>
          </div>
          <div className="profile-card__details">
            <div className="profile-card__detail">
              <Phone size={14} /> +91 98765 43210
            </div>
            <div className="profile-card__detail">
              <MapPin size={14} /> 142 Residency Road, Bangalore
            </div>
          </div>
          <div className="profile-card__tags">
            <span className="tag">Hypertension</span>
            <span className="tag">Arthritis</span>
          </div>
        </motion.div>

        {/* Health Score */}
        <motion.div className="card score-card" variants={itemVariants}>
          <h3 className="card-title">Overall Health Score</h3>
          <div className="score-card__content">
            <div className="score-card__ring-wrapper">
              <svg viewBox="0 0 120 120" className="score-card__ring">
                <circle cx="60" cy="60" r="52" stroke="#E8ECFF" strokeWidth="12" fill="none" />
                <circle
                  cx="60" cy="60" r="52"
                  stroke="#2DC653"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 52 * 0.88} ${2 * Math.PI * 52}`}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div className="score-card__ring-text">
                <span className="score-card__score">88</span>
                <span className="score-card__max">/100</span>
              </div>
            </div>
            <div className="score-card__stats">
              <div className="score-stat">
                <span className="score-stat__label">Trend</span>
                <span className="score-stat__value text-success"><TrendingUp size={14} /> +2%</span>
              </div>
              <div className="score-stat">
                <span className="score-stat__label">Status</span>
                <span className="score-stat__value">Stable</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Live Vitals */}
        <motion.div className="card vitals-card" variants={itemVariants}>
          <div className="vitals-card__header">
            <h3 className="card-title">Live Vitals</h3>
            <span className="status-dot status-dot--live">Live</span>
          </div>
          <div className="vitals-grid">
            <div className="vital-box">
              <div className="vital-box__icon" style={{ background: 'rgba(230, 57, 70, 0.1)', color: '#E63946' }}>
                <Heart size={20} />
              </div>
              <div className="vital-box__info">
                <span className="vital-box__value">{heartRate} <small>bpm</small></span>
                <span className="vital-box__label">Heart Rate</span>
              </div>
            </div>
            <div className="vital-box">
              <div className="vital-box__icon" style={{ background: 'rgba(26, 60, 255, 0.1)', color: '#1A3CFF' }}>
                <Activity size={20} />
              </div>
              <div className="vital-box__info">
                <span className="vital-box__value">{spo2} <small>%</small></span>
                <span className="vital-box__label">SpO2</span>
              </div>
            </div>
            <div className="vital-box">
              <div className="vital-box__icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B' }}>
                <TrendingUp size={20} />
              </div>
              <div className="vital-box__info">
                <span className="vital-box__value">124/82</span>
                <span className="vital-box__label">Blood Pressure</span>
              </div>
            </div>
            <div className="vital-box">
              <div className="vital-box__icon" style={{ background: 'rgba(45, 198, 83, 0.1)', color: '#2DC653' }}>
                <Activity size={20} />
              </div>
              <div className="vital-box__info">
                <span className="vital-box__value">3,240</span>
                <span className="vital-box__label">Steps Today</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* --- BOTTOM ROW --- */}
      <div className="dashboard__grid-bottom">
        {/* Active Alerts */}
        <motion.div className="card alerts-card" variants={itemVariants}>
          <div className="card-header-flex">
            <h3 className="card-title">Active Alerts</h3>
            <span className="badge badge--warning">2 New</span>
          </div>
          <div className="alerts-list">
            <div className="alert-item alert-item--danger">
              <div className="alert-item__icon"><AlertTriangle size={16} /></div>
              <div className="alert-item__content">
                <h4>Fall Detected</h4>
                <p>Possible fall detected in Main Hallway.</p>
                <span className="alert-item__time">2 mins ago</span>
              </div>
              <button className="btn btn-emergency btn-sm">View</button>
            </div>
            <div className="alert-item alert-item--warning">
              <div className="alert-item__icon"><Clock size={16} /></div>
              <div className="alert-item__content">
                <h4>Missed Medication</h4>
                <p>Vitamin D5 was scheduled for 10:00 AM.</p>
                <span className="alert-item__time">1 hour ago</span>
              </div>
              <button className="btn btn-outline btn-sm">Remind</button>
            </div>
            <div className="alert-item alert-item--success">
              <div className="alert-item__icon"><CheckCircle2 size={16} /></div>
              <div className="alert-item__content">
                <h4>Normal Blood Pressure</h4>
                <p>Latest reading is within normal range.</p>
                <span className="alert-item__time">3 hours ago</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Activity Status */}
        <motion.div className="card activity-card" variants={itemVariants}>
          <h3 className="card-title">Daily Activity Status</h3>
          <div className="activity-bars">
            <div className="activity-bar">
              <div className="activity-bar__header">
                <span><Activity size={14} /> Movement</span>
                <span>78%</span>
              </div>
              <div className="progress-bg">
                <div className="progress-fill" style={{ width: '78%', background: '#1A3CFF' }}></div>
              </div>
            </div>
            <div className="activity-bar">
              <div className="activity-bar__header">
                <span><Moon size={14} /> Sleep Quality</span>
                <span>92%</span>
              </div>
              <div className="progress-bg">
                <div className="progress-fill" style={{ width: '92%', background: '#8B5CF6' }}></div>
              </div>
            </div>
            <div className="activity-bar">
              <div className="activity-bar__header">
                <span><Coffee size={14} /> Nutrition</span>
                <span>65%</span>
              </div>
              <div className="progress-bg">
                <div className="progress-fill" style={{ width: '65%', background: '#F59E0B' }}></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div className="card timeline-card" variants={itemVariants}>
          <div className="card-header-flex">
            <h3 className="card-title">Activity Timeline</h3>
            <button className="btn-text">View All <ChevronRight size={16}/></button>
          </div>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-item__dot timeline-item__dot--success"></div>
              <div className="timeline-item__content">
                <h4>Lunch Logged</h4>
                <p>Dal, Rice, and Vegetables</p>
                <span className="timeline-item__time">1:30 PM</span>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item__dot timeline-item__dot--primary"></div>
              <div className="timeline-item__content">
                <h4>Medication Administered</h4>
                <p>Blood Pressure Tablet (Amlodipine)</p>
                <span className="timeline-item__time">9:00 AM</span>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item__dot timeline-item__dot--success"></div>
              <div className="timeline-item__content">
                <h4>Breakfast Logged</h4>
                <p>Oatmeal with fruits</p>
                <span className="timeline-item__time">8:30 AM</span>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item__dot timeline-item__dot--muted"></div>
              <div className="timeline-item__content">
                <h4>Woke up</h4>
                <p>8 hours of restful sleep</p>
                <span className="timeline-item__time">7:00 AM</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
