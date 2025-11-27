import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from "./pages/Login.jsx"
import Noticias from "./pages/Noticias.jsx"
import Home from './pages/Home.jsx'
import Projetos from './pages/Projetos.jsx'
import Error from './pages/Error.jsx'
import Contato from './pages/Contatos.jsx'

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
      path:"/Projetos",
      element: <Projetos/>
    },
    {
      path:"/Noticias",
      element: <Noticias/>
    },
    {
      path:"/Contato",
      element:<Contato/>
    }

])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <RouterProvider router={router}/>
    </>
  </StrictMode>,
)
