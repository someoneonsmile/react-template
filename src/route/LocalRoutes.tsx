import { ReactNode } from 'react'
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from 'react-router'

import SideContent from '@/layout/SideContent'
import { cm } from '@/util/style'

import ErrorBoundary from './ErrorBoundary'

// import AIPage from '@/page/AIPage'

// import PoetryPage from '@page/PoetryPage'

interface LayoutProps {
  children: ReactNode
}

function AppLayout({ children }: LayoutProps) {
  return (
    <SideContent
      side={undefined}
      // className={cm("divide-x", "divide-ethereal-more")}
      sideClassName={cm('bg-ethereal-more')}
    >
      {children}
    </SideContent>
  )
}

const router = createBrowserRouter(
  [
    {
      element: (
        <AppLayout>
          <Outlet />
        </AppLayout>
      ),
      ErrorBoundary: () => (
        <AppLayout>
          <ErrorBoundary />
        </AppLayout>
      ),
      children: [
        // https://stackoverflow.com/a/75467698
        {
          index: true,
          element: <Navigate to='/trade' replace />,
        },
        {
          path: 'trade',
          children: [
            {
              path: 'list',
              // element: <TradeList />,
            },
          ],
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
)

function LocalRoutes() {
  return <RouterProvider router={router} />
}

export default LocalRoutes
