import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import AuthPage from './pages/AuthPage.jsx'
import CaretakerRegistered from './pages/CaretakerRegistered.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/caretaker/registered" element={<CaretakerRegistered />} />
    </Routes>
  )
}

export default App
