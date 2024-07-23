import { useContext, useEffect } from 'react'
import useRouteElement from './useRouteElements'
import { LocalStorageEventTarget } from './utils/auth'
import { AppContext } from './context/app.context'

function App() {
  const routeElements = useRouteElement()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLocalStorage', reset)

    return () => LocalStorageEventTarget.removeEventListener('clearLocalStorage', reset)
  }, [reset])
  return <>{routeElements}</>
}

export default App
