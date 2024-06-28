import React from 'react'
import { useAuth } from '../../pages/Login/AuthContext'
import { useNavigate } from "react-router-dom";
import './Navbar.css'

export default function Navbar() {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        setToken();
        navigate("/login", { replace: true });
    };

    return (
        <div className='containerNavbar'>
            Navbar
            <button onClick={handleLogout}>Sair</button>
        </div>
    )
}
