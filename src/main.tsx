import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import Layout from './components/Layout.tsx'
import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import News from './pages/News.tsx'
import NewDetail from './pages/NewDetail.tsx'
import Projects from './pages/Projects.tsx'
import ProjectDetail from './pages/ProjectDetail.tsx'
import Contact from './pages/Contact.tsx'
import Activities from './pages/Activities.tsx'
import Reports from './pages/Reports.tsx'
import Debug from './pages/Debug.tsx'

import './index.css'

const router = createBrowserRouter([
  {
    path: "/Login",
    element: <Login />,
  },

  {
    // O Layout vira a raiz para todas as outras rotas
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/", // Corresponde exatamente a o caminho "/"
        element: <Home />,
      },
      {
        path: "/Debug",
        element: <Debug />,
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
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
