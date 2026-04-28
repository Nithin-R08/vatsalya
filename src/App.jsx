import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import AuthPage from './pages/AuthPage.jsx'
import CaretakerRegistered from './pages/CaretakerRegistered.jsx'
import CaretakerLayout from './components/CaretakerLayout.jsx'
import CaretakerDashboard from './pages/CaretakerDashboard.jsx'
import CaretakerActivity from './pages/CaretakerActivity.jsx'
import CaretakerHealth from './pages/CaretakerHealth.jsx'
import CaretakerSettings from './pages/CaretakerSettings.jsx'
import ParentLayout from './components/ParentLayout.jsx'
import ParentDashboard from './pages/ParentDashboard.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/caretaker/registered" element={<CaretakerRegistered />} />
      
      <Route path="/caretaker" element={<CaretakerLayout />}>
        <Route path="dashboard" element={<CaretakerDashboard />} />
        <Route path="activity" element={<CaretakerActivity />} />
        <Route path="health" element={<CaretakerHealth />} />
        <Route path="settings" element={<CaretakerSettings />} />
      </Route>

      <Route path="/parent" element={<ParentLayout />}>
        <Route path="dashboard" element={<ParentDashboard />} />
      </Route>
    </Routes>
  )
}

export default App
