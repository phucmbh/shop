import { useRoutes } from "react-router-dom"
import ProducList from "./pages/ProductList"
import Login from "./pages/Login"
import Register from "./pages/Register"
import RegisterLayout from "./layouts/RegisterLayout/RegisterLayout"

const useRouteElement = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <ProducList />
    },
    {
      path: "/login",
      element: (
        <RegisterLayout>
          <Login />
        </RegisterLayout>
      )
    },
    {
      path: "/register",
      element: (
        <RegisterLayout>
          <Register />
        </RegisterLayout>
      )
    }
  ])

  return element
}

export default useRouteElement
