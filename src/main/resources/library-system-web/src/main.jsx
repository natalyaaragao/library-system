import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'vite/modulepreload-polyfill'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthProvider from './pages/Login/AuthContext.jsx';
import Biblioteca from './pages/Biblioteca/Biblioteca.jsx'
import Emprestimo from './pages/Emprestimo/Emprestimo.jsx'
import Busca from './pages/Busca/Busca.jsx'
import ReadBusca from './pages/Busca/ReadBusca.jsx'
import Login from './pages/Login/Login.jsx'
import Secao from './pages/Secao/Secao.jsx'
import Material from './pages/Material/Material.jsx'
import Lista from './pages/Lista/Lista.jsx'
import Cadastro from './pages/Login/Cadastro.jsx'

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
      },
      {
        path: "/secao",
        element: <Secao />
      },
      {
        path: "/material",
        element: <Material />
      },
      {
        path: "/lista",
        element: <Lista />
      },
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/cadastro",
    element: <Cadastro />
  }  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>
)

