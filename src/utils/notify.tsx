import { toast, ToastOptions } from 'react-toastify'

export const notify = (message: string, options: ToastOptions) => {
  return toast(message, options)
}

export default notify

export const handleError = (error: any) => {
  const e =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error.message ||
    error
  notify(e, { type: 'error' })
}

export const handleGenericError = (error: string = 'An error occurred') => {
  toast.error(error)
}

export const handleGenericSuccess = (message: string = 'Success') => {
  toast.success(message)
}

export const handleGenericInfo = (message: string = 'Heads up!') => {
  toast.info(message)
}
