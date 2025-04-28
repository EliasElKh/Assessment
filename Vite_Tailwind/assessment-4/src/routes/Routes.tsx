import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../components/pages/LoginPage'
import DashboardPage from '../components/pages/DashboardPage'
import ProtectedRoute from './ProtectedRoute'
import SignUpPage from '../components/pages/SignUpPage'
import EditUserPage from '../components/pages/EditUserPage'

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
        <Route
          path="/dashboard/new"
          element={
            <ProtectedRoute>
              <SignUpPage firstName="" email="" dob="" status="" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/edit/:id"
          element={
            <ProtectedRoute>
              <EditUserPage />
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
