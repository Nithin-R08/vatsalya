import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation, Trans } from 'react-i18next'
import {
  BellRing,
  PhoneCall,
  Pill,
  HeartPulse,
  Mic,
  Video,
  Volume2,
  X,
  AlertTriangle,
  PhoneForwarded
} from 'lucide-react'
import './ParentDashboard.css'

export default function ParentDashboard() {
  const { t, i18n } = useTranslation()
  const [isVoiceActive, setIsVoiceActive] = useState(false)
  const [voiceText, setVoiceText] = useState("")
  const [isSosActive, setIsSosActive] = useState(false)
  const [sosTimer, setSosTimer] = useState(5)

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  }

  // --- Voice Assistant (Web Speech API) ---
  const recognitionRef = useRef(null)

  const handleVoiceActivate = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    
    if (!SpeechRecognition) {
      setIsVoiceActive(true)
      setVoiceText("Voice not supported in this browser.")
      setTimeout(() => setIsVoiceActive(false), 3000)
      return
    }

    const recognition = new SpeechRecognition()
    recognitionRef.current = recognition
    recognition.continuous = false
    recognition.interimResults = true
    
    // Set recognition language based on app language
    if (i18n.language === 'hi') recognition.lang = 'hi-IN'
    else if (i18n.language === 'ta') recognition.lang = 'ta-IN'
    else recognition.lang = 'en-US'

    recognition.onstart = () => {
      setIsVoiceActive(true)
      setVoiceText(t('listening'))
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setVoiceText(transcript)

      if (event.results[0].isFinal) {
        const lower = transcript.toLowerCase()
        setTimeout(() => {
          setIsVoiceActive(false)
          if (lower.includes('help') || lower.includes('emergency') || lower.includes('sos') || lower.includes('मदद') || lower.includes('உதவி')) {
            handleSosClick()
          } else if (lower.includes('jane') || lower.includes('call') || lower.includes('कॉल') || lower.includes('அழை')) {
            alert(t('callingJane'))
          }
        }, 1500)
      }
    }

    recognition.onerror = (event) => {
      console.error("Speech error", event.error)
      setVoiceText("Could not understand. Please try again.")
      setTimeout(() => setIsVoiceActive(false), 2000)
    }

    recognition.start()
  }

  // --- SOS Timer Simulation ---
  useEffect(() => {
    let interval = null
    if (isSosActive && sosTimer > 0) {
      interval = setInterval(() => {
        setSosTimer((prev) => prev - 1)
      }, 1000)
    } else if (sosTimer === 0) {
      clearInterval(interval)
      // Timer finished -> SOS dispatched
    }
    return () => clearInterval(interval)
  }, [isSosActive, sosTimer])

  const handleSosClick = () => {
    setIsSosActive(true)
    setSosTimer(5)
  }

  const cancelSos = () => {
    setIsSosActive(false)
  }

  return (
    <motion.div 
      className="parent-dash"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <header className="parent-dash__header">
        <h1 className="parent-dash__title">{t('greeting')}</h1>
        <p className="parent-dash__subtitle">{t('subtitle')}</p>
      </header>

      {/* EMERGENCY SOS BUTTON */}
      <motion.button 
        className="parent-btn parent-btn--sos"
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSosClick}
      >
        <div className="parent-btn__icon-wrap">
          <BellRing size={48} color="#fff" />
        </div>
        <div className="parent-btn__content">
          <h2>{t('sosBtn')}</h2>
          <p>{t('sosDesc')}</p>
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
          <h3>{t('callJane')}</h3>
        </motion.button>

        <motion.button 
          className="parent-btn parent-btn--secondary"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Pill size={36} />
          <h3>{t('myMedicines')}</h3>
          <span className="parent-btn__badge">1 {t('due')}</span>
        </motion.button>

        <motion.button 
          className="parent-btn parent-btn--tertiary"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Video size={36} />
          <h3>{t('doctorVisit')}</h3>
        </motion.button>

        <motion.button 
          className="parent-btn parent-btn--quaternary"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <HeartPulse size={36} />
          <h3>{t('healthStats')}</h3>
        </motion.button>
      </div>

      {/* VOICE ASSISTANT BOTTOM BAR */}
      <motion.div className="voice-bar" variants={itemVariants}>
        <div className="voice-bar__info">
          <Volume2 size={24} color="#1A3CFF" />
          <p>
            <Trans i18nKey="voicePrompt" components={{ 1: <strong /> }}>
              Tap the mic and say <strong>"Call Jane"</strong> or <strong>"I need help"</strong>
            </Trans>
          </p>
        </div>
        <button className="voice-bar__btn" onClick={handleVoiceActivate}>
          <Mic size={32} color="#fff" />
        </button>
      </motion.div>

      {/* --- OVERLAYS --- */}

      {/* Voice Assistant Overlay */}
      <AnimatePresence>
        {isVoiceActive && (
          <motion.div 
            className="overlay-fullscreen voice-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className="overlay-close" onClick={() => setIsVoiceActive(false)}>
              <X size={32} />
            </button>
            <div className="voice-overlay__content">
              <div className="voice-waves">
                <motion.div 
                  className="voice-wave"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                />
                <motion.div 
                  className="voice-wave voice-wave--delay"
                  animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
                <div className="voice-mic-core">
                  <Mic size={64} color="#fff" />
                </div>
              </div>
              <h2 className="voice-overlay__text">{voiceText}</h2>
              <p className="voice-overlay__subtext">{t('processing')}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SOS Overlay */}
      <AnimatePresence>
        {isSosActive && (
          <motion.div 
            className="overlay-fullscreen sos-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="sos-overlay__content">
              <div className="sos-overlay__icon-wrap">
                <AlertTriangle size={80} color="#fff" />
              </div>
              
              {sosTimer > 0 ? (
                <>
                  <h1 className="sos-overlay__title">{t('sosTriggered')}</h1>
                  <p className="sos-overlay__desc">{t('alerting')}</p>
                  <div className="sos-overlay__timer">{sosTimer}</div>
                  <button className="sos-overlay__cancel" onClick={cancelSos}>
                    {t('cancelAlert')}
                  </button>
                </>
              ) : (
                <>
                  <h1 className="sos-overlay__title">{t('alertSent')}</h1>
                  <p className="sos-overlay__desc">{t('alertSentDesc')}</p>
                  <div className="sos-actions">
                    <button className="btn btn-outline sos-btn-action" onClick={() => setIsSosActive(false)}>
                      <X size={20} /> {t('dismiss')}
                    </button>
                    <button className="btn sos-btn-action" style={{ background: '#fff', color: '#E63946' }}>
                      <PhoneForwarded size={20} /> {t('speakToJane')}
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  )
}
