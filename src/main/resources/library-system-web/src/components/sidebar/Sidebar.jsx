import React, { Fragment } from "react";
import './Sidebar.css'
import { IoHomeOutline, IoSearch, IoBookOutline, IoBookmarkOutline, IoSettingsOutline, IoLibraryOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
        <div className='containerSidebar'>
            <p className='sidebar-title'>library-system</p>
            
            <nav className='nav-list'>
              <p className='sidebar-subtitle'>titulo-1</p>
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
                    <Link to="/emprestimo">
                      <IoBookOutline className='menu-icon'/>
                      Empréstimo
                    </Link>
                  </li>
                </ul>
            </nav>
            <nav className='nav-list'>
              <p className='sidebar-subtitle'>titulo-2</p>
              <ul>
                <li className='menu-item'>
                  <a href="#">
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