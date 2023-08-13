import { Header } from '@app/components'
import { Outlet } from 'react-router-dom'

export const App = (): JSX.Element => {
  return (
    <section className='p-2 h-screen'>
      <Header />
      <div className='mt-5'>
        <Outlet />
      </div>
    </section>
  )
}
