import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'vite/modulepreload-polyfill'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Biblioteca from './pages/Biblioteca/Biblioteca.jsx'
import Emprestimo from './pages/Emprestimo/Emprestimo.jsx'
import Busca from './pages/Busca/Busca.jsx'
import ReadBusca from './pages/Busca/ReadBusca.jsx'
import Login from './pages/Login/Login.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/emprestimo",
        element: <Emprestimo />
      },
      {
        path: "/biblioteca", 
        element: <Biblioteca />  
      },
      {
        path: "/busca",
        element: <Busca />
      },
      {
        path: "/buscaResultado",
        element: <ReadBusca />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  } 
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)

