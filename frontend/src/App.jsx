import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import Home from "./pages/home/Home"
import Workspace from "./pages/workspace/Workspace"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
const router = createBrowserRouter(createRoutesFromElements(
  <>
      <Route index element={<Home />} />
      <Route path="workspace" element={<Workspace />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="*" element={<h1>404 - not found</h1>} />
  </>
    
  
))
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
