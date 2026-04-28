import { motion } from 'framer-motion'
import {
  Pill,
  Stethoscope,
  Activity,
  ChevronRight,
  FileText,
  Calendar,
  Video,
  Home as HomeIcon,
  BrainCircuit,
  Heart
} from 'lucide-react'
import './CaretakerHealth.css'

export default function CaretakerHealth() {
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
      className="health-page"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <header className="health-page__header">
        <h1 className="health-page__title">Healthcare Services</h1>
        <p className="health-page__subtitle">Manage medical needs and professional care</p>
      </header>

      <div className="health-page__grid">
        
        {/* --- LEFT COLUMN --- */}
        <div className="health-page__col-main">
          
          {/* Order Medicines */}
          <motion.section className="card service-card" variants={itemVariants}>
            <div className="service-card__icon-wrap bg-primary-light">
              <Pill size={24} color="#1A3CFF" />
            </div>
            <div className="service-card__content">
              <h2 className="service-card__title">Order Medicines</h2>
              <p className="service-card__desc">
                Upload prescriptions and order refills from partnered pharmacies like 1mg and PharmEasy.
              </p>
              <div className="service-card__actions">
                <button className="btn btn-primary btn-sm">Browse Pharmacy</button>
                <button className="btn btn-outline btn-sm">Upload Prescription</button>
              </div>
            </div>
            <div className="service-card__image service-card__image--pharmacy"></div>
          </motion.section>

          {/* Book Appointment */}
          <motion.section className="card service-card" variants={itemVariants}>
            <div className="service-card__icon-wrap bg-success-light">
              <Stethoscope size={24} color="#2DC653" />
            </div>
            <div className="service-card__content">
              <h2 className="service-card__title">Book Doctor Appointment</h2>
              <p className="service-card__desc">
                Schedule telehealth consultations or request in-home doctor visits via Practo network.
              </p>
              <div className="service-card__action-grid">
                <button className="action-box">
                  <Video size={20} className="action-box__icon" />
                  <span>Telehealth</span>
                </button>
                <button className="action-box">
                  <HomeIcon size={20} className="action-box__icon" />
                  <span>In-Home Visit</span>
                </button>
                <button className="action-box action-box--primary">
                  <Calendar size={20} className="action-box__icon" />
                  <span>Schedule</span>
                </button>
              </div>
            </div>
          </motion.section>

          {/* AI Health Track */}
          <motion.section className="card ai-card" variants={itemVariants}>
            <div className="ai-card__badge">Premium AI Feature</div>
            <div className="ai-card__header">
              <div className="ai-card__icon">
                <BrainCircuit size={28} color="#8B5CF6" />
              </div>
              <div>
                <h2 className="ai-card__title">Health Track Analysis</h2>
                <p className="ai-card__subtitle">Predictive AI insights based on daily vitals</p>
              </div>
            </div>
            <div className="ai-card__body">
              <p className="ai-card__text">
                "Arthur's sleep quality has improved by 15% this week, but his afternoon 
                blood pressure shows slight elevation. Consider scheduling a check-up if 
                the trend continues for 3 more days."
              </p>
              <button className="btn btn-primary" style={{ background: '#8B5CF6' }}>
                View Full Analytics <ChevronRight size={16} />
              </button>
            </div>
          </motion.section>

        </div>

        {/* --- RIGHT COLUMN --- */}
        <div className="health-page__col-side">
          
          {/* Medical Records */}
          <motion.div className="card records-card" variants={itemVariants}>
            <div className="card-header-flex">
              <h3 className="card-title">Medical Records</h3>
              <button className="btn-text">View All</button>
            </div>
            <div className="records-list">
              <div className="record-item">
                <div className="record-item__icon"><FileText size={16} /></div>
                <div className="record-item__info">
                  <h4>Latest Blood Report</h4>
                  <span>Oct 15, 2024 • Thyrocare</span>
                </div>
                <button className="record-item__dl" aria-label="Download"><ChevronRight size={16}/></button>
              </div>
              <div className="record-item">
                <div className="record-item__icon"><FileText size={16} /></div>
                <div className="record-item__info">
                  <h4>Cardiology Consult</h4>
                  <span>Sep 02, 2024 • Dr. Sharma</span>
                </div>
                <button className="record-item__dl" aria-label="Download"><ChevronRight size={16}/></button>
              </div>
              <button className="btn btn-outline btn-full mt-4">
                <FileText size={16} /> Upload New Record
              </button>
            </div>
          </motion.div>

          {/* Connected Devices */}
          <motion.div className="card devices-card" variants={itemVariants}>
            <div className="card-header-flex">
              <h3 className="card-title">Connected Devices</h3>
              <span className="status-dot status-dot--live">Syncing</span>
            </div>
            <div className="device-item">
              <div className="device-item__icon"><Activity size={20} color="#1A3CFF"/></div>
              <div className="device-item__info">
                <h4>Apple Watch Series 8</h4>
                <span>Last synced: Just now</span>
              </div>
              <div className="device-item__battery">
                <div className="battery-level" style={{ width: '84%' }}></div>
                <span>84%</span>
              </div>
            </div>
            <div className="device-item">
              <div className="device-item__icon"><Heart size={20} color="#E63946"/></div>
              <div className="device-item__info">
                <h4>Omron BP Monitor</h4>
                <span>Last synced: 9:00 AM today</span>
              </div>
              <div className="device-item__battery">
                <div className="battery-level" style={{ width: '60%' }}></div>
                <span>60%</span>
              </div>
            </div>
            <button className="btn btn-outline btn-full mt-4">
              Connect New Device
            </button>
          </motion.div>

        </div>
      </div>
    </motion.div>
  )
}
