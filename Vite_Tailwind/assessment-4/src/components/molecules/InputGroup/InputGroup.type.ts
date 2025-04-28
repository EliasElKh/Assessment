export interface InputGroupProps {
  id: string
  label: string
  type: string
  value?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  theme?: 'light' | 'dark'
  error?: string
  autoComplete?: string
}