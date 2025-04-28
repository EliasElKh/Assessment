import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom' 
import LoginForm from '../../organisms/LoginForm'
import useLoginStore from '../../../store/login'
import useThemeStore from '../../../store/themeStore'
import { useLoginMutation } from '../../../hook/userLoginMutation'

const LoginPage: React.FC = () => {
  const {startLogin , token, error, loading } = useLoginStore()
  const navigate = useNavigate() 
  const { theme } = useThemeStore()
  const { mutate: login } = useLoginMutation()

  const handleLogin = (email: string, password: string) => {
    startLogin()   
    login({ email, password }) 
  }

  useEffect(() => {
    if (token) {
      navigate('/dashboard') 
    }
  }, [loading, error, token, navigate])

  return (
    <div className={"flex justify-center items-center h-screen bg-gray-200" + (theme === 'dark' ? ' dark:bg-gray-700' : '')}>
      <LoginForm onSubmit={handleLogin} loading={loading} error={error ? String(error) : ''} />
    </div>
  )
}

export default LoginPage
