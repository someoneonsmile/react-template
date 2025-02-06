import { Suspense } from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router'

// import AIPage from '@/page/AIPage'

// import PoetryPage from '@page/PoetryPage'

const router = createBrowserRouter(
  [
    {
      path: '/',
      // element: <Layout />,
      children: [
        // https://stackoverflow.com/a/75467698
        {
          index: true,
          element: <Navigate to='/index' replace />,
        },
        {
          path: 'index',
          element: <></>,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
)

function LocalRoutes() {
  return (
    <Suspense fallback={<span>Loading...</span>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default LocalRoutes
