import React, { useState, useEffect } from 'react'
import { LoginFormProps } from './LoginForm.type'
import InputGroup from '../../molecules/InputGroup'
import Button from '../../atoms/Botton'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import useThemeStore from '../../../store/themeStore'

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading, error }) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { theme } = useThemeStore()

  useEffect(() => {
    if (email || password) {
      setEmailError('')
      setPasswordError('')
    }
  }, [email, password])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmailError('')
    setPasswordError('')

    let isValid = true
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address')
      isValid = false
    }
    if (!password) {
      setPasswordError('Password is required')
      isValid = false
    }
    if (!isValid) return

    
    onSubmit(email, password)
  }

  return (
    <div className={`p-8 rounded-lg shadow-lg w-96 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <h1 className={`text-2xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        Login
      </h1>

      <form onSubmit={handleSubmit}>
        <InputGroup
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          theme={theme}
          error={emailError}
        />

        <div className="relative mb-4">
          <InputGroup
            id="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            theme={theme}
            error={passwordError}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={`absolute top-[38px] right-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        </div>

        {error && (
          <div className="mb-4 p-2 text-sm text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-700">
            {error}
          </div>
        )}

        <Button
          type="submit"
          className={`w-full mt-4 py-2 rounded-md font-medium ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <span className="animate-spin mr-2">↻</span>
              Logging in...
            </span>
          ) : (
            'Login'
          )}
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
