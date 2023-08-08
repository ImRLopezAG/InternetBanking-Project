import { Header } from '@/components'
import { useAuthStore } from '@/context'
import { Outlet } from 'react-router-dom'

export const App = (): JSX.Element => {
  const user = useAuthStore((state) => state.user)
  return (
    <section className='p-2'>
      {user && <Header />}
      <div className=''>
        <Outlet />
      </div>
    </section>
  )
}
