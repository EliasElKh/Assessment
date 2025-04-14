import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom' 
import LoginForm from '../../organisms/LoginForm'
import useLoginStore from '../../../store/login'
import useThemeStore from '../../../store/themeStore'

const LoginPage: React.FC = () => {
  const { login, token, error, loading } = useLoginStore()
  const navigate = useNavigate() 
  const { theme } = useThemeStore()

  const handleLogin = (email: string, password: string) => {
    login(email, password) 
  }

  useEffect(() => {
    if (token) {
      navigate('/dashboard') 
    }
  }, [loading, error, token, navigate])

  return (
    <div className={"flex justify-center items-center h-screen bg-gray-200" + (theme === 'dark' ? ' dark:bg-gray-700' : '')}>
      <LoginForm onSubmit={handleLogin} />
    </div>
  )
}

export default LoginPage
