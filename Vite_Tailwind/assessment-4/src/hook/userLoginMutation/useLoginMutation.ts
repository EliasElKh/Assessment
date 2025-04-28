import { useMutation } from '@tanstack/react-query'
import { loginUser } from '../../api/login'
import useLoginStore from '../../store/login'
import { LoginMutationArgs } from './userLoginMutation.type'

export const useLoginMutation = () => {
  const { setAuthData, loginError } = useLoginStore()

  return useMutation<boolean, Error, LoginMutationArgs>({
    mutationFn: async ({ email, password }) => {
      try {
        const data = await loginUser({ email, password })
        
        
        setAuthData(data.accessToken, data.expiresIn)
        return true
      } catch (error) {
        loginError(error instanceof Error ? error.message : 'Login failed')
        return false
      }
    }
  })
}