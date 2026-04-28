import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  Circle,
  Pill,
  Coffee,
  Footprints,
  Activity,
  Heart,
  Droplets,
  CalendarDays,
  Plus
} from 'lucide-react'
import './CaretakerActivity.css'

export default function CaretakerActivity() {
  const [medications, setMedications] = useState([
    { id: 1, name: 'Amlodipine', dosage: '5mg', time: '08:00 AM', status: 'completed', type: 'pill' },
    { id: 2, name: 'Vitamin D3', dosage: '1000 IU', time: '10:00 AM', status: 'pending', type: 'pill' },
    { id: 3, name: 'Metformin', dosage: '500mg', time: '08:00 PM', status: 'pending', type: 'pill' },
  ])

  const [nutrition, setNutrition] = useState([
    { id: 1, name: 'Breakfast', time: '08:30 AM', status: 'completed', details: 'Oatmeal, Banana, Milk' },
    { id: 2, name: 'Hydration', time: '11:00 AM', status: 'completed', details: '2 glasses of water' },
    { id: 3, name: 'Lunch', time: '01:30 PM', status: 'completed', details: 'Dal, Rice, Vegetables' },
    { id: 4, name: 'Evening Tea', time: '05:00 PM', status: 'pending', details: 'Tea, Biscuits' },
    { id: 5, name: 'Dinner', time: '08:30 PM', status: 'pending', details: 'Roti, Subzi' },
  ])

  const toggleMedication = (id) => {
    setMedications(prev =>
      prev.map(med =>
        med.id === id ? { ...med, status: med.status === 'completed' ? 'pending' : 'completed' } : med
      )
    )
  }

  const toggleNutrition = (id) => {
    setNutrition(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: item.status === 'completed' ? 'pending' : 'completed' } : item
      )
    )
  }

  const completedCount = 
    medications.filter(m => m.status === 'completed').length + 
    nutrition.filter(n => n.status === 'completed').length
    
  const totalCount = medications.length + nutrition.length
  const progressPercent = Math.round((completedCount / totalCount) * 100)

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <motion.div 
      className="activity-page"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <header className="activity-page__header">
        <div>
          <h1 className="activity-page__title">Daily Activity Tracker</h1>
          <p className="activity-page__subtitle">
            <CalendarDays size={16} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-3px' }}/>
            Today, {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </p>
        </div>
      </header>

      <div className="activity-page__grid">
        {/* --- LEFT COLUMN --- */}
        <div className="activity-page__col-main">
          
          {/* Medications Section */}
          <motion.section className="activity-section card" variants={itemVariants}>
            <div className="activity-section__header">
              <div className="activity-section__title-wrap">
                <div className="activity-section__icon bg-primary-light">
                  <Pill size={20} color="#1A3CFF" />
                </div>
                <h2 className="activity-section__title">Medications</h2>
              </div>
              <button className="btn btn-outline btn-sm">
                <Plus size={16} /> Add New
              </button>
            </div>

            <div className="task-list">
              <AnimatePresence>
                {medications.map((med) => (
                  <motion.div 
                    key={med.id}
                    className={`task-item ${med.status === 'completed' ? 'task-item--completed' : ''}`}
                    onClick={() => toggleMedication(med.id)}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <button className="task-item__checkbox">
                      {med.status === 'completed' ? 
                        <CheckCircle2 size={24} color="#2DC653" fill="rgba(45, 198, 83, 0.1)"/> : 
                        <Circle size={24} color="#9CA3AF" />
                      }
                    </button>
                    <div className="task-item__content">
                      <div className="task-item__main">
                        <span className="task-item__name">{med.name}</span>
                        <span className="task-item__badge">{med.dosage}</span>
                      </div>
                      <span className="task-item__time">{med.time}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.section>

          {/* Nutrition Section */}
          <motion.section className="activity-section card" variants={itemVariants}>
            <div className="activity-section__header">
              <div className="activity-section__title-wrap">
                <div className="activity-section__icon bg-warning-light">
                  <Coffee size={20} color="#F59E0B" />
                </div>
                <h2 className="activity-section__title">Nutrition & Hydration</h2>
              </div>
            </div>

            <div className="task-list">
              <AnimatePresence>
                {nutrition.map((item) => (
                  <motion.div 
                    key={item.id}
                    className={`task-item ${item.status === 'completed' ? 'task-item--completed' : ''}`}
                    onClick={() => toggleNutrition(item.id)}
                    layout
                  >
                    <button className="task-item__checkbox">
                      {item.status === 'completed' ? 
                        <CheckCircle2 size={24} color="#2DC653" fill="rgba(45, 198, 83, 0.1)"/> : 
                        <Circle size={24} color="#9CA3AF" />
                      }
                    </button>
                    <div className="task-item__content">
                      <div className="task-item__main">
                        <span className="task-item__name">{item.name}</span>
                      </div>
                      <div className="task-item__details-row">
                        <span className="task-item__time">{item.time}</span>
                        <span className="task-item__desc">• {item.details}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.section>

        </div>

        {/* --- RIGHT COLUMN --- */}
        <div className="activity-page__col-side">
          
          {/* Daily Progress */}
          <motion.div className="card progress-widget" variants={itemVariants}>
            <h3 className="card-title text-center">Daily Progress</h3>
            <div className="progress-widget__ring-wrap">
              <svg viewBox="0 0 160 160" className="progress-widget__ring">
                <circle cx="80" cy="80" r="70" stroke="#F3F4F6" strokeWidth="16" fill="none" />
                <circle
                  cx="80" cy="80" r="70"
                  stroke="#1A3CFF"
                  strokeWidth="16"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 70 * (progressPercent / 100)} ${2 * Math.PI * 70}`}
                  strokeLinecap="round"
                  transform="rotate(-90 80 80)"
                  style={{ transition: 'stroke-dasharray 0.8s ease-in-out' }}
                />
              </svg>
              <div className="progress-widget__text">
                <span className="progress-widget__percent">{progressPercent}%</span>
                <span className="progress-widget__label">Done</span>
              </div>
            </div>
            <p className="progress-widget__summary">
              {completedCount} of {totalCount} tasks completed today
            </p>
          </motion.div>

          {/* Vitals Summary */}
          <motion.div className="card vitals-summary" variants={itemVariants}>
            <h3 className="card-title">Current Vitals</h3>
            <div className="vitals-summary__list">
              <div className="vitals-summary__item">
                <div className="vitals-summary__icon bg-danger-light"><Heart size={16} color="#E63946"/></div>
                <div className="vitals-summary__info">
                  <span className="vitals-summary__val">72 bpm</span>
                  <span className="vitals-summary__lbl">Heart Rate</span>
                </div>
              </div>
              <div className="vitals-summary__item">
                <div className="vitals-summary__icon bg-primary-light"><Activity size={16} color="#1A3CFF"/></div>
                <div className="vitals-summary__info">
                  <span className="vitals-summary__val">94%</span>
                  <span className="vitals-summary__lbl">SpO2</span>
                </div>
              </div>
              <div className="vitals-summary__item">
                <div className="vitals-summary__icon bg-success-light"><Footprints size={16} color="#2DC653"/></div>
                <div className="vitals-summary__info">
                  <span className="vitals-summary__val">3,240</span>
                  <span className="vitals-summary__lbl">Steps</span>
                </div>
              </div>
              <div className="vitals-summary__item">
                <div className="vitals-summary__icon bg-info-light"><Droplets size={16} color="#0EA5E9"/></div>
                <div className="vitals-summary__info">
                  <span className="vitals-summary__val">1.2L</span>
                  <span className="vitals-summary__lbl">Water Intake</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Upcoming Activity */}
          <motion.div className="card upcoming-widget" variants={itemVariants}>
            <div className="upcoming-widget__icon">
              <Footprints size={24} color="#8B5CF6"/>
            </div>
            <h3 className="upcoming-widget__title">Evening Walk</h3>
            <p className="upcoming-widget__time">06:00 PM - 06:30 PM</p>
            <p className="upcoming-widget__desc">Community park, light walking</p>
            <button className="btn btn-primary upcoming-widget__btn" style={{ background: '#8B5CF6' }}>
              Start Activity
            </button>
          </motion.div>

        </div>
      </div>
    </motion.div>
  )
}
