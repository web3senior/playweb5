import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import './index.scss'
import './styles/global.scss'

console.log(`%c ${import.meta.env.VITE_AUTHOR}`, 'color:#aaa;font-size:2rem;background:#222;')

import ErrorPage from './error-page'
const Layout = lazy(() => import('./routes/layout.jsx'))
import SplashScreen, { loader as splashScreenLoader } from './routes/splashScreen.jsx'
import Home, { loader as homeLoader } from './routes/home.jsx'
import Album, { loader as albumLoader } from './routes/album.jsx'
import Song, { loader as songLoader} from './routes/song.jsx'
import Loading from './routes/components/LoadingSpinner'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <AuthProvider>
          <Layout />
        </AuthProvider>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: splashScreenLoader,
        element: <SplashScreen title={`Welcome`} />,
      },
      {
        path: 'home',
        errorElement: <ErrorPage />,
        loader: homeLoader,
        element: <Home title={`Home`} />,
      },
      {
        path: 'album',
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Album to="/" replace />,
          },
          {
            path: ':recordId',
            loader: albumLoader,
            element: <Song />,
          },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
