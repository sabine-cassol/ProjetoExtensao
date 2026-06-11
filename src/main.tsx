import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home.tsx'
import Login from './Pages/Login.tsx'
import News from './Pages/News.tsx'
import NewDetail from './Pages/NewDetail.tsx'
import Projects from './Pages/Projects.tsx'
import ProjectDetail from './Pages/ProjectDetail.tsx'
import Contact from './Pages/Contact.tsx'
import Activities from './Pages/Activities.tsx'
import Reports from './Pages/Reports.tsx'

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Notícias",
    element: <News />,
  },
  {
    path: "/Notícias/:noticiaId",
    element: <NewDetail />,
  },
  {
    path: "/Projetos",
    element: <Projects />,
  },
  {
    path: "/Projetos/:projetoId",
    element: <ProjectDetail />,
  },
  {
    path: "/Contato",
    element: <Contact />,
  },
  {
    path: "/Atividades",
    element: <Activities />,
  },
  {
    path: "/Relatórios",
    element: <Reports />,
  },

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
