import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../components/pages/LoginPage'
import DashboardPage from '../components/pages/DashboardPage'
import ProtectedRoute from './ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App
