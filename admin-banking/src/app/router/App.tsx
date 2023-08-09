import { useAuthStore } from '@/app/context'
import { Header } from '@app/components'
import { Outlet } from 'react-router-dom'

export const App = (): JSX.Element => {
  const user = useAuthStore((state) => state.user)
  return (
    <section className='p-2 h-screen'>
      {user && <Header />}
      <div className='mt-5'>
        <Outlet />
      </div>
    </section>
  )
}
