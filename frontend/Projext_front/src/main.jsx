import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from "./pages/Login.jsx"
import Noticias from "./pages/Noticias.jsx"
import Home from './pages/Home.jsx'
import Error from './pages/Error.jsx'

const router = createBrowserRouter([
    {
      path:"/",
      element: <Home/>,
      errorElement: <Error/>
    },
    {
      path:"/Login",
      element: <Login/>
    },
    {
      path:"/Noticias",
      element: <Noticias/>
    }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <RouterProvider router={router}/>
    </>
  </StrictMode>,
)
