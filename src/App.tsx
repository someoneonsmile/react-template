import '@/css/App.css'
import LocalRoutes from '@/route/LocalRoutes'

import { SpeedInsights } from '@vercel/speed-insights/react'

function App() {
  return (
    <div className='h-screen w-screen'>
      <LocalRoutes />
      <SpeedInsights />
    </div>
  )
}

export default App
