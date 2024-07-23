import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import { CartLayout, MainLayout, RegisterLayout } from './layouts'
import { Login, ProductList, Register } from './pages'
import { useContext } from 'react'
import { AppContext } from './context/app.context'
import { PATH } from './constants'
import { ProductDetail } from './pages/ProductDetail'
import { Cart } from './pages/Cart'
import { UserLayout } from './pages/User/layout/UserLayout'
import { ChangePassword, HistoryPurchase, Profile } from './pages/User/pages'

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
              <Cart />
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
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: PATH.REGISTER,
          element: (
            <RegisterLayout>
              <Register />
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
      index: true,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    }
  ])

  return element
}

export default useRouteElement
