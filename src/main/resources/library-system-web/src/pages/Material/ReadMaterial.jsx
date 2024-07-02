import { React, useState, useEffect } from 'react';
import axios from "../../axiosInstance";
import '../../components/form/FormSelect.css'
import '../../components/form/Form.css'
import { IoSearchOutline } from "react-icons/io5";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CustomTable from '../../components/table/CustomTable'
import Paper from '@mui/material/Paper';

function createData(titulo, tipoMaterial, entradaPrincipal, assunto) {
    return {titulo, tipoMaterial, entradaPrincipal, assunto};
}

function ReadMaterial() {
    const [material, setMaterial] = useState([]);

    const col = [
        { id: 'titulo', label: 'Título', minWidth: 270 },
        { id: 'tipoMaterial', label: 'Tipo', minWidth: 100, tag: true },
        { id: 'entradaPrincipal', label: 'Autor', minWidth: 200 },
        { id: 'assunto', label: 'Assunto', minWidth: 170 }
    ];

    const [dados, setDados] = useState([]);
    
    useEffect(() => {
        axios.get('/materiais').then((res) => {
            return res.data;
        })
        .then((data) => {
            console.log(data);
            setMaterial(data);
            const newDados = data.map(item => 
                createData(item.titulo, item.tipoMaterial, item.entradaPrincipal, item.assunto)
            );
            setDados(newDados);
        })
        .catch(err => console.log(err));
    }, []);

    return (
        <Paper>
            <div className='containerForm'>
                <CustomTable columns = {col} rows = {dados} />
            </div>
        </Paper>
    )
}

export default ReadMaterial;