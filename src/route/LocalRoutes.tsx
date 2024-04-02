import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter(
  [
    {
      path: '/',
      // element: <Layout />,
      children: [
        // https://stackoverflow.com/a/75467698
        {
          index: true,
          // element: <Navigate to='/poetry' replace />,
        },
        // {
        //   path: '/poetry',
        //   element: <PoetryPage />,
        // },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
)

function LocalRoutes() {
  return (
    <RouterProvider router={router} fallbackElement={<span>Loading...</span>} />
  )
}

export default LocalRoutes
