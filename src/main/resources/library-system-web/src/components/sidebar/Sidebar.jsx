import React, { Fragment } from "react";
import './Sidebar.css'
import { IoHomeOutline, IoSearch, IoBookOutline, IoDocumentTextOutline, IoDocumentsOutline, IoBookmarkOutline, IoSettingsOutline, IoLibraryOutline } from "react-icons/io5";
import { MdShelves } from "react-icons/md";
import { Link } from "react-router-dom";
import Divider from '@mui/material/Divider';

export const Sidebar = () => {
  return (
        <div className='containerSidebar'>
            <p className='sidebar-title'>library-system</p>
            
            <nav className='nav-list'>
              <ul>
                  <li className='menu-item'>
                    <a href="#">
                      <IoHomeOutline className='menu-icon'/>
                      Inicio
                    </a>
                  </li>
                  <li className='menu-item'>
                    <Link to="/busca">
                      <IoSearch className='menu-icon'/>
                      Busca
                    </Link>
                  </li>
                  <li className='menu-item'>
                    <Link to="/biblioteca">
                      <IoLibraryOutline className='menu-icon'/>
                      Bibliotecas
                    </Link>
                  </li>
                  <li className='menu-item'>
                    <Link to="/secao">
                      <MdShelves className='menu-icon'/>
                      Seção
                    </Link>
                  </li>
                  <li className='menu-item'>
                    <Link to="/material">
                      <IoDocumentTextOutline className='menu-icon'/>
                      Material
                    </Link>
                  </li>
                  <li className='menu-item'>
                    <Link to="/exemplar">
                      <IoDocumentsOutline className='menu-icon'/>
                      Exemplar
                    </Link>
                  </li>
                  <li className='menu-item'>
                    <Link to="/emprestimo">
                      <IoBookOutline className='menu-icon'/>
                      Empréstimo
                    </Link>
                  </li>
                </ul>
            </nav>
            <nav className='nav-list'>
              <Divider center />
              <ul>
                <li className='menu-item'>
                  <a href="/lista">
                    <IoBookmarkOutline className='menu-icon'/>
                    Lista
                  </a>
                </li>
                <li className='menu-item'>
                  <a href="#">
                    <IoSettingsOutline className='menu-icon'/>
                    Configuração
                  </a>
                </li>
              </ul>
            </nav>
        </div>
  )
}

export default Sidebar