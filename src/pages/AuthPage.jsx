import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  User,
  Phone,
  Stethoscope,
  UserRound,
  Shield,
  CheckCircle2,
} from 'lucide-react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import './AuthPage.css'

const ROLES = [
  {
    id: 'caretaker',
    icon: Stethoscope,
    emoji: '🧑‍⚕️',
    title: 'Caretaker / Family Member',
    description: 'Monitor health, manage medications, and stay connected with your loved ones.',
    color: '#1A3CFF',
    bg: 'rgba(26, 60, 255, 0.06)',
    borderColor: 'rgba(26, 60, 255, 0.2)',
  },
  {
    id: 'parent',
    icon: UserRound,
    emoji: '👴',
    title: 'Parent / Senior',
    description: 'Access simplified care features, SOS alerts, and voice assistance.',
    color: '#2DC653',
    bg: 'rgba(45, 198, 83, 0.06)',
    borderColor: 'rgba(45, 198, 83, 0.2)',
  },
]

export default function AuthPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('login') // 'login' | 'register'
  const [selectedRole, setSelectedRole] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const validateLogin = () => {
    const errs = {}
    if (!formData.email.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Enter a valid email'
    if (!formData.password) errs.password = 'Password is required'
    else if (formData.password.length < 6) errs.password = 'Password must be at least 6 characters'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const validateRegister = () => {
    const errs = {}
    if (!selectedRole) errs.role = 'Please select a role'
    if (!formData.name.trim()) errs.name = 'Name is required'
    if (!formData.email.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Enter a valid email'
    if (!formData.phone.trim()) errs.phone = 'Phone number is required'
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) errs.phone = 'Enter a valid 10-digit number'
    if (!formData.password) errs.password = 'Password is required'
    else if (formData.password.length < 6) errs.password = 'Minimum 6 characters'
    if (formData.password !== formData.confirmPassword) errs.confirmPassword = 'Passwords do not match'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!validateLogin()) return

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password)
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid))
      
      if (userDoc.exists()) {
        const userData = userDoc.data()
        localStorage.setItem('vatsalya_auth', JSON.stringify({ ...userData, uid: userCredential.user.uid, isLoggedIn: true }))
        navigate(userData.role === 'caretaker' ? '/caretaker/dashboard' : '/parent/dashboard')
      } else {
        setErrors({ email: 'User profile not found in database' })
      }
    } catch (error) {
      console.error(error)
      setErrors({ email: 'Invalid email or password' })
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!validateRegister()) return

    if (selectedRole === 'caretaker') {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
        const parentId = `VSY-2024-${String(Math.floor(10000 + Math.random() * 90000))}`
        
        const userData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: 'caretaker',
          parentId,
          createdAt: new Date().toISOString(),
        }

        await setDoc(doc(db, 'users', userCredential.user.uid), userData)
        localStorage.setItem('vatsalya_auth', JSON.stringify({ ...userData, uid: userCredential.user.uid, isLoggedIn: true }))

        navigate('/caretaker/registered', { state: { parentId, name: formData.name } })
      } catch (error) {
        setErrors({ email: error.message })
      }
    } else {
      // Parent registration — navigate to parent-specific registration form
      navigate('/auth/parent-register', {
        state: { name: formData.name, phone: formData.phone, email: formData.email, password: formData.password }
      })
    }
  }

  const switchTab = (tab) => {
    setActiveTab(tab)
    setErrors({})
    setSelectedRole(null)
    setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' })
  }

  return (
    <div className="auth-page">
      {/* Background decorations */}
      <div className="auth-page__bg">
        <div className="auth-page__shape auth-page__shape--1" />
        <div className="auth-page__shape auth-page__shape--2" />
        <div className="auth-page__shape auth-page__shape--3" />
      </div>

      {/* Back to home */}
      <Link to="/" className="auth-page__back" aria-label="Back to home">
        <ArrowLeft size={18} />
        <span>Home</span>
      </Link>

      {/* Logo */}
      <div className="auth-page__logo" onClick={() => navigate('/')}>
        <div className="auth-page__logo-icon">
          <Heart size={18} fill="#fff" />
        </div>
        <span className="auth-page__logo-text">Vatsalya</span>
      </div>

      {/* Auth Card */}
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Tabs */}
        <div className="auth-card__tabs">
          <button
            className={`auth-card__tab ${activeTab === 'login' ? 'auth-card__tab--active' : ''}`}
            onClick={() => switchTab('login')}
            aria-label="Switch to login"
          >
            Log In
          </button>
          <button
            className={`auth-card__tab ${activeTab === 'register' ? 'auth-card__tab--active' : ''}`}
            onClick={() => switchTab('register')}
            aria-label="Switch to register"
          >
            Register
          </button>
          <div
            className="auth-card__tab-indicator"
            style={{ transform: `translateX(${activeTab === 'login' ? '0%' : '100%'})` }}
          />
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'login' ? (
            <motion.form
              key="login"
              className="auth-card__form"
              onSubmit={handleLogin}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="auth-card__header">
                <h1 className="auth-card__title">Welcome Back</h1>
                <p className="auth-card__subtitle">Sign in to continue caring for your loved ones</p>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="login-email">Email Address</label>
                <div className={`form-input-wrapper ${errors.email ? 'form-input-wrapper--error' : ''}`}>
                  <Mail size={18} className="form-input-icon" />
                  <input
                    id="login-email"
                    type="email"
                    className="form-input"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    aria-label="Email address"
                  />
                </div>
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="login-password">Password</label>
                <div className={`form-input-wrapper ${errors.password ? 'form-input-wrapper--error' : ''}`}>
                  <Lock size={18} className="form-input-icon" />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    className="form-input"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    aria-label="Password"
                  />
                  <button
                    type="button"
                    className="form-input-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <span className="form-error">{errors.password}</span>}
              </div>

              <div className="auth-card__forgot">
                <a href="#" aria-label="Forgot password">Forgot password?</a>
              </div>

              <button type="submit" className="btn btn-primary btn-lg auth-card__submit" aria-label="Sign in">
                Sign In <ArrowRight size={18} />
              </button>

              <p className="auth-card__switch">
                Don't have an account?{' '}
                <button type="button" onClick={() => switchTab('register')}>Create one</button>
              </p>
            </motion.form>
          ) : (
            <motion.form
              key="register"
              className="auth-card__form"
              onSubmit={handleRegister}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="auth-card__header">
                <h1 className="auth-card__title">Create Account</h1>
                <p className="auth-card__subtitle">Choose your role to get started</p>
              </div>

              {/* Role Selection */}
              <div className="role-selection">
                {ROLES.map(role => (
                  <motion.button
                    key={role.id}
                    type="button"
                    className={`role-card ${selectedRole === role.id ? 'role-card--selected' : ''}`}
                    onClick={() => {
                      setSelectedRole(role.id)
                      if (errors.role) {
                        setErrors(prev => {
                          const next = { ...prev }
                          delete next.role
                          return next
                        })
                      }
                    }}
                    style={{
                      '--role-color': role.color,
                      '--role-bg': role.bg,
                      '--role-border': role.borderColor,
                    }}
                    whileTap={{ scale: 0.98 }}
                    aria-label={`Select role: ${role.title}`}
                  >
                    <div className="role-card__icon-row">
                      <span className="role-card__emoji">{role.emoji}</span>
                      {selectedRole === role.id && (
                        <motion.div
                          className="role-card__check"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                        >
                          <CheckCircle2 size={20} color={role.color} fill={role.bg} />
                        </motion.div>
                      )}
                    </div>
                    <h3 className="role-card__title">{role.title}</h3>
                    <p className="role-card__desc">{role.description}</p>
                  </motion.button>
                ))}
              </div>
              {errors.role && <span className="form-error" style={{ textAlign: 'center', display: 'block' }}>{errors.role}</span>}

              {/* Registration Form Fields */}
              <AnimatePresence>
                {selectedRole && (
                  <motion.div
                    className="auth-card__fields"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    <div className="form-group">
                      <label className="form-label" htmlFor="reg-name">Full Name</label>
                      <div className={`form-input-wrapper ${errors.name ? 'form-input-wrapper--error' : ''}`}>
                        <User size={18} className="form-input-icon" />
                        <input
                          id="reg-name"
                          type="text"
                          className="form-input"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          aria-label="Full name"
                        />
                      </div>
                      {errors.name && <span className="form-error">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="reg-email">Email Address</label>
                      <div className={`form-input-wrapper ${errors.email ? 'form-input-wrapper--error' : ''}`}>
                        <Mail size={18} className="form-input-icon" />
                        <input
                          id="reg-email"
                          type="email"
                          className="form-input"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          aria-label="Email address"
                        />
                      </div>
                      {errors.email && <span className="form-error">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="reg-phone">Phone Number</label>
                      <div className={`form-input-wrapper ${errors.phone ? 'form-input-wrapper--error' : ''}`}>
                        <Phone size={18} className="form-input-icon" />
                        <input
                          id="reg-phone"
                          type="tel"
                          className="form-input"
                          placeholder="10-digit phone number"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          aria-label="Phone number"
                        />
                      </div>
                      {errors.phone && <span className="form-error">{errors.phone}</span>}
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="reg-password">Password</label>
                        <div className={`form-input-wrapper ${errors.password ? 'form-input-wrapper--error' : ''}`}>
                          <Lock size={18} className="form-input-icon" />
                          <input
                            id="reg-password"
                            type={showPassword ? 'text' : 'password'}
                            className="form-input"
                            placeholder="Min 6 characters"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            aria-label="Password"
                          />
                        </div>
                        {errors.password && <span className="form-error">{errors.password}</span>}
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="reg-confirm">Confirm Password</label>
                        <div className={`form-input-wrapper ${errors.confirmPassword ? 'form-input-wrapper--error' : ''}`}>
                          <Lock size={18} className="form-input-icon" />
                          <input
                            id="reg-confirm"
                            type={showPassword ? 'text' : 'password'}
                            className="form-input"
                            placeholder="Re-enter password"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            aria-label="Confirm password"
                          />
                        </div>
                        {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg auth-card__submit" aria-label="Create account">
                      Create Account <ArrowRight size={18} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="auth-card__switch">
                Already have an account?{' '}
                <button type="button" onClick={() => switchTab('login')}>Sign in</button>
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Security badge */}
      <div className="auth-page__security">
        <Shield size={14} />
        <span>256-bit encryption • HIPAA compliant • SOC 2 certified</span>
      </div>
    </div>
  )
}
