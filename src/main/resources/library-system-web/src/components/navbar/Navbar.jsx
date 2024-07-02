import React from 'react'
import { useAuth } from '../../pages/Login/AuthContext'
import { useNavigate } from "react-router-dom";
import './Navbar.css'
import Button from '@mui/material/Button';

export default function Navbar() {
    const { setToken, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        setToken();
        navigate("/login", { replace: true });
    };

    return (
        <div className='containerNavbar'>
            <p style={{marginRight: "15px"}}>{user}</p>
            <Button onClick={handleLogout} variant="contained">Sair</Button>
        </div>
    )
}
