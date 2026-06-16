import '@/css/App.css'
import { SpeedInsights } from '@vercel/speed-insights/react'

import LocalRoutes from '@/route/LocalRoutes'

import ThemeContextProvider from './provider/ThemeContextProvider'

function App() {
  return (
    <ThemeContextProvider>
      <div className='h-screen w-screen'>
        <LocalRoutes />
        <SpeedInsights />
      </div>
    </ThemeContextProvider>
  )
}

export default App
