import { motion } from 'framer-motion'
import {
  BellRing,
  PhoneCall,
  Pill,
  HeartPulse,
  Mic,
  Video,
  Volume2
} from 'lucide-react'
import './ParentDashboard.css'

export default function ParentDashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  }

  return (
    <motion.div 
      className="parent-dash"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <header className="parent-dash__header">
        <h1 className="parent-dash__title">Hello, Arthur</h1>
        <p className="parent-dash__subtitle">How can we help you today?</p>
      </header>

      {/* EMERGENCY SOS BUTTON */}
      <motion.button 
        className="parent-btn parent-btn--sos"
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="parent-btn__icon-wrap">
          <BellRing size={48} color="#fff" />
        </div>
        <div className="parent-btn__content">
          <h2>EMERGENCY HELP</h2>
          <p>Tap here to alert Jane immediately</p>
        </div>
      </motion.button>

      {/* QUICK ACTIONS GRID */}
      <div className="parent-dash__grid">
        <motion.button 
          className="parent-btn parent-btn--primary"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <PhoneCall size={36} />
          <h3>Call Jane</h3>
        </motion.button>

        <motion.button 
          className="parent-btn parent-btn--secondary"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Pill size={36} />
          <h3>My Medicines</h3>
          <span className="parent-btn__badge">1 Due</span>
        </motion.button>

        <motion.button 
          className="parent-btn parent-btn--tertiary"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Video size={36} />
          <h3>Doctor Visit</h3>
        </motion.button>

        <motion.button 
          className="parent-btn parent-btn--quaternary"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <HeartPulse size={36} />
          <h3>Health Stats</h3>
        </motion.button>
      </div>

      {/* VOICE ASSISTANT BOTTOM BAR */}
      <motion.div className="voice-bar" variants={itemVariants}>
        <div className="voice-bar__info">
          <Volume2 size={24} color="#1A3CFF" />
          <p>Tap the mic and say <strong>"Call Jane"</strong> or <strong>"I need help"</strong></p>
        </div>
        <button className="voice-bar__btn">
          <Mic size={32} color="#fff" />
        </button>
      </motion.div>
    </motion.div>
  )
}
