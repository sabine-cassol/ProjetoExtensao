import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import News from './pages/News.tsx'
import NewDetail from './pages/NewDetail.tsx'
import Projects from './pages/Projects.tsx'
import ProjectDetail from './pages/ProjectDetail.tsx'
import Contact from './pages/Contact.tsx'
import Activities from './pages/Activities.tsx'
import Reports from './pages/Reports.tsx'

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
