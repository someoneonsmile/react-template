import '@/css/App.css'
import LocalRoutes from '@/route/LocalRoutes'

import { SpeedInsights } from '@vercel/speed-insights/react'

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
