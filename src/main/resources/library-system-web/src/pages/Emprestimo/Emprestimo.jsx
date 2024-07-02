import { React, useState } from 'react';
import MeusEmprestimos from './MeusEmprestimos';
import AddEmprestimo from './AddEmprestimo';
import axios from "../../axiosInstance";
import Card from '../../components/card/Card'
import '../../components/form/Form.css'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { IoSearchOutline } from "react-icons/io5";
import Button from '@mui/material/Button';


function Emprestimo() {
    const [toggle, setToggle] = useState(true);
    const toggleChecked = (e) => {
        setToggle(toggle => !toggle)
    } 
    return (
        <section className="containerBody">
            <div className="containerTop">
                <h1> Empréstimos </h1>
                {toggle && 
                    <Button onClick={toggleChecked} size="large" variant="contained" sx={{textTransform: 'none'}}>
                        Consultar empréstimos
                    </Button>}
                {!toggle &&
                    <Button onClick={toggleChecked} size="large" variant="contained" sx={{textTransform: 'none'}}>
                        Adicionar empréstimo
                    </Button>
                }
            </div>
            {toggle && <AddEmprestimo /> }
            {!toggle && <MeusEmprestimos /> }
        </section>
    );
};

export default Emprestimo