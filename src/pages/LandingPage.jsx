import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart,
  Watch,
  AlertTriangle,
  Mic,
  Activity,
  BarChart3,
  Shield,
  Star,
  ArrowRight,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Zap,
  Users,
  Clock,
  CheckCircle2,
} from 'lucide-react'
import './LandingPage.css'

const features = [
  {
    icon: Watch,
    title: 'Smartwatch Sync',
    description: 'Real-time vitals from BLE-enabled wearables. Heart rate, SpO2, and step tracking synced seamlessly.',
    color: '#1A3CFF',
    bg: 'rgba(26, 60, 255, 0.08)',
  },
  {
    icon: AlertTriangle,
    title: 'Instant SOS',
    description: 'One-tap emergency alerts to caretakers with GPS location. Auto-trigger on unusual activity patterns.',
    color: '#E63946',
    bg: 'rgba(230, 57, 70, 0.08)',
  },
  {
    icon: Mic,
    title: 'Voice Assistant',
    description: 'Natural language commands in 12 Indian languages. "Call my nurse" or "Read my vitals" — hands-free care.',
    color: '#8B5CF6',
    bg: 'rgba(139, 92, 246, 0.08)',
  },
  {
    icon: Activity,
    title: 'Fall Detection',
    description: 'AI-powered fall detection with 30-second response window. Auto-contacts emergency services if no response.',
    color: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.08)',
  },
  {
    icon: BarChart3,
    title: 'Health Dashboard',
    description: 'Comprehensive health analytics for caretakers. Track medications, nutrition, activity, and sleep patterns.',
    color: '#2DC653',
    bg: 'rgba(45, 198, 83, 0.08)',
  },
]

const testimonials = [
  {
    name: 'Priya Mehta',
    role: 'Daughter & Caretaker',
    avatar: 'PM',
    text: 'Vatsalya gave me peace of mind when I moved to Bangalore for work. I can monitor my mother\'s health in real-time, and the SOS feature saved us during a midnight fall.',
    rating: 5,
  },
  {
    name: 'Rajesh Kumar',
    role: 'Son & Tech Professional',
    avatar: 'RK',
    text: 'The voice assistant in Hindi is a game-changer. My father just speaks naturally, and Vatsalya understands. No more struggling with tiny buttons.',
    rating: 5,
  },
  {
    name: 'Dr. Anjali Sharma',
    role: 'Geriatric Specialist',
    avatar: 'AS',
    text: 'I recommend Vatsalya to all my patients\' families. The medication tracking and health analytics make remote care management truly effective.',
    rating: 5,
  },
]

const stats = [
  { value: '50,000+', label: 'Families Connected' },
  { value: '99.7%', label: 'SOS Response Rate' },
  { value: '12', label: 'Indian Languages' },
  { value: '4.9★', label: 'User Rating' },
]

export default function LandingPage() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [heartRate, setHeartRate] = useState(72)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate(prev => {
        const delta = Math.floor(Math.random() * 5) - 2
        return Math.max(68, Math.min(78, prev + delta))
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="landing-page">
      {/* ===== NAVBAR ===== */}
      <nav className={`landing-nav ${scrolled ? 'landing-nav--scrolled' : ''}`}>
        <div className="container landing-nav__inner">
          <div className="landing-nav__logo" onClick={() => navigate('/')}>
            <div className="landing-nav__logo-icon">
              <Heart size={20} fill="#fff" />
            </div>
            <span className="landing-nav__logo-text">Vatsalya</span>
          </div>

          <div className="landing-nav__links">
            <a href="#features">Features</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#stats">About</a>
            <button className="btn btn-outline btn-nav" onClick={() => navigate('/auth')}>Log In</button>
            <button className="btn btn-primary btn-nav" onClick={() => navigate('/auth')}>
              Get Started <ArrowRight size={16} />
            </button>
          </div>

          <button
            className="landing-nav__mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="landing-nav__mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
              <a href="#stats" onClick={() => setMobileMenuOpen(false)}>About</a>
              <button className="btn btn-outline" style={{ width: '100%' }} onClick={() => { setMobileMenuOpen(false); navigate('/auth') }}>
                Log In
              </button>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => { setMobileMenuOpen(false); navigate('/auth') }}>
                Get Started
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="hero">
        <div className="hero__bg-shapes">
          <div className="hero__shape hero__shape--1" />
          <div className="hero__shape hero__shape--2" />
          <div className="hero__shape hero__shape--3" />
        </div>

        <div className="container hero__content">
          <motion.div
            className="hero__text"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="hero__badge">
              <Zap size={14} />
              <span>AI-Powered Elderly Care Platform</span>
            </div>
            <h1 className="hero__title">
              Stay Connected.<br />
              <span className="gradient-text">Stay Safe.</span>
            </h1>
            <p className="hero__subtitle">
              Empowering families to care for their elderly loved ones with
              real-time health monitoring, instant SOS alerts, and intelligent
              voice assistance — all in one beautiful platform.
            </p>
            <div className="hero__cta-group">
              <button
                className="btn btn-primary btn-xl hero__cta"
                onClick={() => navigate('/auth')}
                aria-label="Create free account"
              >
                Create Free Account <ArrowRight size={18} />
              </button>
              <button
                className="btn btn-outline btn-xl hero__cta"
                onClick={() => navigate('/auth')}
                aria-label="Watch demo"
              >
                Watch Demo
              </button>
            </div>
            <div className="hero__trust">
              <div className="hero__trust-avatars">
                {['SK', 'PM', 'RK', 'AJ'].map((initials, i) => (
                  <div key={i} className="hero__trust-avatar" style={{ zIndex: 4 - i }}>
                    {initials}
                  </div>
                ))}
              </div>
              <p className="hero__trust-text">
                <strong>50,000+</strong> families trust Vatsalya
              </p>
            </div>
          </motion.div>

          <motion.div
            className="hero__visual"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            {/* Floating Heart Rate Card */}
            <div className="hero__float-card hero__float-card--hr animate-float">
              <div className="hero__float-card-icon" style={{ background: 'rgba(230, 57, 70, 0.1)' }}>
                <Heart size={20} color="#E63946" fill="#E63946" />
              </div>
              <div>
                <span className="hero__float-card-value">{heartRate} BPM</span>
                <span className="hero__float-card-label">Heart Rate</span>
              </div>
              <div className="hero__float-card-pulse" />
            </div>

            {/* Floating SpO2 Card */}
            <div className="hero__float-card hero__float-card--spo2 animate-float" style={{ animationDelay: '2s' }}>
              <div className="hero__float-card-icon" style={{ background: 'rgba(26, 60, 255, 0.1)' }}>
                <Activity size={20} color="#1A3CFF" />
              </div>
              <div>
                <span className="hero__float-card-value">94%</span>
                <span className="hero__float-card-label">SpO2</span>
              </div>
            </div>

            {/* Floating SOS Card */}
            <div className="hero__float-card hero__float-card--sos animate-float" style={{ animationDelay: '4s' }}>
              <div className="hero__float-card-icon" style={{ background: 'rgba(45, 198, 83, 0.1)' }}>
                <Shield size={20} color="#2DC653" />
              </div>
              <div>
                <span className="hero__float-card-value">Active</span>
                <span className="hero__float-card-label">SOS Shield</span>
              </div>
            </div>

            {/* Central Dashboard Mockup */}
            <div className="hero__dashboard-mock">
              <div className="hero__dashboard-header">
                <div className="hero__dashboard-dot" style={{ background: '#E63946' }} />
                <div className="hero__dashboard-dot" style={{ background: '#F59E0B' }} />
                <div className="hero__dashboard-dot" style={{ background: '#2DC653' }} />
              </div>
              <div className="hero__dashboard-body">
                <div className="hero__dash-row">
                  <div className="hero__dash-score">
                    <svg viewBox="0 0 120 120" className="hero__dash-ring">
                      <circle cx="60" cy="60" r="52" stroke="#E8ECFF" strokeWidth="8" fill="none" />
                      <circle
                        cx="60" cy="60" r="52"
                        stroke="#1A3CFF"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 52 * 0.94} ${2 * Math.PI * 52}`}
                        strokeLinecap="round"
                        transform="rotate(-90 60 60)"
                      />
                    </svg>
                    <div className="hero__dash-score-text">
                      <span className="hero__dash-score-num">94</span>
                      <span className="hero__dash-score-label">Health Score</span>
                    </div>
                  </div>
                  <div className="hero__dash-vitals">
                    <div className="hero__dash-vital">
                      <Heart size={14} color="#E63946" />
                      <span>{heartRate} bpm</span>
                    </div>
                    <div className="hero__dash-vital">
                      <Activity size={14} color="#1A3CFF" />
                      <span>94% SpO2</span>
                    </div>
                    <div className="hero__dash-vital">
                      <Clock size={14} color="#2DC653" />
                      <span>8h Sleep</span>
                    </div>
                  </div>
                </div>
                <div className="hero__dash-timeline">
                  <div className="hero__dash-event">
                    <CheckCircle2 size={14} color="#2DC653" />
                    <span>Morning medication taken</span>
                  </div>
                  <div className="hero__dash-event">
                    <CheckCircle2 size={14} color="#2DC653" />
                    <span>Breakfast logged</span>
                  </div>
                  <div className="hero__dash-event hero__dash-event--pending">
                    <Clock size={14} color="#F59E0B" />
                    <span>Evening walk — upcoming</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="stats-bar" id="stats">
        <div className="container stats-bar__inner">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="stats-bar__item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className="stats-bar__value">{stat.value}</span>
              <span className="stats-bar__label">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="features-section" id="features">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-header__badge">Features</span>
            <h2 className="section-header__title">
              Everything Your Family Needs,<br />
              <span className="gradient-text">In One Platform</span>
            </h2>
            <p className="section-header__subtitle">
              From real-time health tracking to emergency response, Vatsalya combines
              cutting-edge AI with compassionate care design.
            </p>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="feature-card card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="feature-card__icon" style={{ background: feature.bg }}>
                  <feature.icon size={24} color={feature.color} />
                </div>
                <h3 className="feature-card__title">{feature.title}</h3>
                <p className="feature-card__desc">{feature.description}</p>
                <button className="feature-card__link" aria-label={`Learn more about ${feature.title}`}>
                  Learn more <ChevronRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials-section" id="testimonials">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-header__badge">Testimonials</span>
            <h2 className="section-header__title">
              Loved by Families<br />
              <span className="gradient-text">Across India</span>
            </h2>
          </motion.div>

          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="testimonial-card card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className="testimonial-card__stars">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <p className="testimonial-card__text">"{t.text}"</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">{t.avatar}</div>
                  <div>
                    <p className="testimonial-card__name">{t.name}</p>
                    <p className="testimonial-card__role">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="cta-section">
        <div className="container cta-section__inner">
          <motion.div
            className="cta-section__content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="cta-section__title">
              Ready to Bridge the<br />
              <span className="gradient-text">Care Gap?</span>
            </h2>
            <p className="cta-section__desc">
              Join 50,000+ families who trust Vatsalya to keep their loved ones
              connected and safe. Start your free account today.
            </p>
            <div className="cta-section__buttons">
              <button
                className="btn btn-primary btn-xl"
                onClick={() => navigate('/auth')}
                aria-label="Create free account"
              >
                Create Free Account <ArrowRight size={18} />
              </button>
              <button
                className="btn btn-outline btn-xl"
                onClick={() => navigate('/auth')}
                aria-label="Talk to a specialist"
              >
                <Phone size={18} /> Talk to a Specialist
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="landing-footer">
        <div className="container landing-footer__inner">
          <div className="landing-footer__brand">
            <div className="landing-nav__logo">
              <div className="landing-nav__logo-icon">
                <Heart size={20} fill="#fff" />
              </div>
              <span className="landing-nav__logo-text" style={{ color: '#fff' }}>Vatsalya</span>
            </div>
            <p className="landing-footer__tagline">Stay Connected. Stay Safe.</p>
            <p className="landing-footer__desc">
              AI-powered elderly care that brings families closer,
              no matter the distance.
            </p>
          </div>

          <div className="landing-footer__links">
            <div className="landing-footer__col">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#stats">About</a>
              <a href="#testimonials">Testimonials</a>
              <a href="#">Pricing</a>
            </div>
            <div className="landing-footer__col">
              <h4>Support</h4>
              <a href="#">Help Center</a>
              <a href="#">Documentation</a>
              <a href="#">Contact Us</a>
              <a href="#">Status</a>
            </div>
            <div className="landing-footer__col">
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>

        <div className="container landing-footer__bottom">
          <p>&copy; 2024 Vatsalya Healthcare Pvt. Ltd. All rights reserved.</p>
          <div className="landing-footer__contact">
            <span><Mail size={14} /> care@vatsalya.health</span>
            <span><Phone size={14} /> 1800-VAT-CARE</span>
            <span><MapPin size={14} /> Bangalore, India</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
