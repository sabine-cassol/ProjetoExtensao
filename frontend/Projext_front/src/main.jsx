import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/UserContext.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from "./pages/Login.jsx"
import Noticias from "./pages/Noticias.jsx"
import Home from './pages/Home.jsx'
import Projetos from './pages/Projetos.jsx'
import ProjetoDetalhe from './pages/ProjetoDetalhe.jsx'
import NoticiaDetalhe from './pages/NoticiaDetalhe.jsx'
import Error from './pages/Error.jsx'
import Contato from './pages/Contatos.jsx'
import Atividades from './pages/Atividades.jsx'
import Relatorios from './pages/Relatorios.jsx'

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
      path: "/Projetos/:projetoId",
      element: <ProjetoDetalhe/> 
    },
    {
      path:"/Noticias",
      element: <Noticias/>
    },
    {
      path: "/Noticias/:noticiaId",
      element: <NoticiaDetalhe/> 
    },
  
    {
      path:"/Contato",
      element:<Contato/>
    },
    {
      path:"/Atividades",
      element: <Atividades/>
    },
    {
      path:"/Relatorios",
      element: <Relatorios/>
    }

])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router}/>
    </UserProvider>
  </StrictMode>,
)
