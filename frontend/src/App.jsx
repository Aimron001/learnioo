import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import Layout from './components/layout/Layout.jsx'
import Login from "./pages/login/Login"
import SignUp from "./pages/register/Register"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Workspace from "./pages/workspace/Workspace"
const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="workspace" element={<Workspace />} />
    </Route>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<SignUp />} />
    <Route path="*" element={<h1>404 - not found</h1>} />
  </>
    
  
))
function App() {
  return (
    <>
    <ToastContainer />
      <RouterProvider router={router} />
    </>
  )
}

export default App
