import useRouteElement from "./useRouteElements"

function App() {
  const routeElements = useRouteElement()
  return <>{routeElements}</>
}

export default App
