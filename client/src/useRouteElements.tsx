import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { lazy, Suspense, useContext } from 'react'
import { AppContext } from './context/app.context'

import { PATH } from './constants'
import { CartLayout, MainLayout, RegisterLayout } from './layouts'
import { UserLayout } from './pages/User/layout/UserLayout'
import ChangePassword from './pages/User/pages/ChangePassword'
import HistoryPurchase from './pages/User/pages/HistoryPurchase'
import Profile from './pages/User/pages/Profile'
import ProductList from './pages/ProductList'

const Login = lazy(() => import('./pages/Login'))
const Cart = lazy(() => import('./pages/Cart'))
const Register = lazy(() => import('./pages/Register'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const NotFound = lazy(() => import('./pages/NotFound'))

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />
}

const useRouteElement = () => {
  const element = useRoutes([
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: PATH.CART,
          element: (
            <CartLayout>
              <Suspense>
                <Cart />
              </Suspense>
            </CartLayout>
          )
        },
        {
          path: PATH.USER,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: PATH.PROFILE,
              element: <Profile />
            },
            {
              path: PATH.CHANGE_PASSWORD,
              element: <ChangePassword />
            },
            {
              path: PATH.PURCHASE,
              element: <HistoryPurchase />
            }
          ]
        }
      ]
    },

    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: PATH.LOGIN,
          element: (
            <RegisterLayout>
              <Suspense>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: PATH.REGISTER,
          element: (
            <RegisterLayout>
              <Suspense>
                <Register />
              </Suspense>
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: PATH.HOME,
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: `${PATH.PRODUCTS}/:id`,
      element: (
        <MainLayout>
          <Suspense>
            <ProductDetail />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: PATH.ALL,
      element: (
        <MainLayout>
          <NotFound />
        </MainLayout>
      )
    }
  ])

  return element
}

export default useRouteElement
