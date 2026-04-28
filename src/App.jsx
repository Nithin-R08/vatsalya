import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import AuthPage from './pages/AuthPage.jsx'
import CaretakerRegistered from './pages/CaretakerRegistered.jsx'
import CaretakerLayout from './components/CaretakerLayout.jsx'
import CaretakerDashboard from './pages/CaretakerDashboard.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/caretaker/registered" element={<CaretakerRegistered />} />
      
      <Route path="/caretaker" element={<CaretakerLayout />}>
        <Route path="dashboard" element={<CaretakerDashboard />} />
        {/* other sub-routes will be added here */}
      </Route>
    </Routes>
  )
}

export default App
