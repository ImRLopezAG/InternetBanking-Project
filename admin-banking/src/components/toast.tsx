import { Toaster } from 'react-hot-toast'

export const Toast = (): JSX.Element => {
  return (
    <Toaster
      position='top-center'
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        className: '',
        duration: 5000,
        style: {
          background: '#363636',
          color: '#fff'
        },
        success: {
          duration: 3000
        },
        error: {
          duration: 3000
        }
      }}
    />
  )
}
