import { useState } from 'react';
import axios from "../../axiosInstance";
import Card from '../../components/card/Card'
import '../../components/form/Form.css'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { IoSearchOutline } from "react-icons/io5";
import ReadSecao from './ReadSecao';
import AddSecao from './AddSecao';

export const Secao = () => {
    const [toggle, setToggle] = useState(true);
    const toggleChecked = (e) => {
        setToggle(toggle => !toggle)
    } 
    return (
        <section className="containerBody">
            <div className="containerTop">
                <h1> Seção </h1>
                {toggle && <button onClick={toggleChecked} className="btn">Consultar seção</button>}
                {!toggle && <button onClick={toggleChecked} className="btn">Adicionar seção</button>}
            </div>
            {toggle && <AddSecao /> }
            {!toggle && <ReadSecao /> }
        </section>
    )
}

export default Secao
