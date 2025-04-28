export interface InputProps {
  id?: string
  type: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  placeholder?: string
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
}