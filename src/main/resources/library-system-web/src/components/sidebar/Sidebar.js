import React from 'react'
import './Sidebar.css'
import { IoHomeOutline, IoSearch, IoBookOutline, IoBookmarkOutline, IoSettingsOutline, IoLibraryOutline } from "react-icons/io5";

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
                <a href="#">
                  <IoSearch className='menu-icon'/>
                  Busca
                </a>
              </li>
              <li className='menu-item'>
                <a href="#">
                  <IoLibraryOutline className='menu-icon'/>
                  Biblioteca
                </a>
              </li>
              <li className='menu-item'>
                <a href="#">
                  <IoBookOutline className='menu-icon'/>
                  Empréstimo
                </a>
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