import { React, useState, useEffect } from 'react';
import ReadLista from './ReadLista';
import { useAuth } from '../../pages/Login/AuthContext'
import './Lista.css'
import AddListasOp from './AddListasOp.jsx';
import Button from '@mui/material/Button';

function Lista() {
    const { user } = useAuth();
    const [toggle, setToggle] = useState(true);
    const toggleChecked = (e) => {
        setToggle(toggle => !toggle)
    } 
    return (
        <section className="containerBody">
            <div className="containerTop">
                <h1> Listas </h1>
                    {toggle && 
                        <Button onClick={toggleChecked} size="large" variant="contained" sx={{textTransform: 'none'}}>
                            Todas as listas
                        </Button>}
                    {!toggle && 
                        <Button onClick={toggleChecked} size="large" variant="contained" sx={{textTransform: 'none'}}>
                            Adicionar Lista
                        </Button>
                    }
            </div>
            {toggle && <AddListasOp email = {user} /> }
            {!toggle && <ReadLista email = {user} /> }
        </section>
    );
}

export default Lista