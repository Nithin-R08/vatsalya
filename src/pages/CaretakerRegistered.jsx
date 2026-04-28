import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  Shield,
} from 'lucide-react'
import './CaretakerRegistered.css'

export default function CaretakerRegistered() {
  const navigate = useNavigate()
  const location = useLocation()
  const [copied, setCopied] = useState(false)

  const parentId = location.state?.parentId || 'VSY-2024-00000'
  const name = location.state?.name || 'User'

  const handleCopy = () => {
    navigator.clipboard.writeText(parentId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    // If no state, redirect to auth
    if (!location.state?.parentId) {
      const auth = JSON.parse(localStorage.getItem('vatsalya_auth') || '{}')
      if (!auth.isLoggedIn) {
        navigate('/auth')
      }
    }
  }, [location.state, navigate])

  return (
    <div className="registered-page">
      <div className="registered-page__bg">
        <div className="registered-page__shape registered-page__shape--1" />
        <div className="registered-page__shape registered-page__shape--2" />
      </div>

      <motion.div
        className="registered-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Success Icon */}
        <motion.div
          className="registered-card__icon"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
        >
          <CheckCircle2 size={48} color="#2DC653" />
        </motion.div>

        <motion.h1
          className="registered-card__title"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Your Caretaker Account is Created!
        </motion.h1>

        <motion.p
          className="registered-card__subtitle"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Welcome, <strong>{name}</strong>! Share the Parent ID below with your parent to link their account.
        </motion.p>

        {/* Parent ID Box */}
        <motion.div
          className="parent-id-box"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="parent-id-box__label">
            <Shield size={16} color="#1A3CFF" />
            <span>Unique Parent ID</span>
          </div>
          <div className="parent-id-box__value-row">
            <span className="parent-id-box__value">{parentId}</span>
            <button
              className="parent-id-box__copy"
              onClick={handleCopy}
              aria-label="Copy Parent ID"
            >
              {copied ? (
                <>
                  <Check size={16} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          className="registered-card__instructions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="registered-card__instruction">
            <div className="registered-card__step-num">1</div>
            <p>Share this ID with your parent or senior</p>
          </div>
          <div className="registered-card__instruction">
            <div className="registered-card__step-num">2</div>
            <p>They will use it during their registration</p>
          </div>
          <div className="registered-card__instruction">
            <div className="registered-card__step-num">3</div>
            <p>Once linked, you can monitor their health in real-time</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.button
          className="btn btn-primary btn-lg registered-card__cta"
          onClick={() => navigate('/caretaker/dashboard')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          aria-label="Go to dashboard"
        >
          Go to Dashboard <ArrowRight size={18} />
        </motion.button>
      </motion.div>
    </div>
  )
}
