import { useState, useEffect } from 'react';
import axios from "../../axiosInstance";
import Card from '../../components/card/Card'
import '../../components/form/FormSelect.css'
import '../../components/form/Form.css'
import { IoSearchOutline } from "react-icons/io5";
import TextField from '@mui/material/TextField';
import CustomTable from '../../components/table/CustomTable'
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

function createData(id, sigla, titulo) {
    return {id, sigla, titulo};
}

function ReadSecao() {
    const [values, setValues] = useState([]);
    const [errorMessage, setErrorMessage] = useState("")
    const [biblioteca, setBiblioteca] = useState();
    function handleSubmit(e) {
        e.preventDefault();
        axios.get('/secoes/biblioteca/' + biblioteca).then((res) => {
            return res.data;
        })
        .then((data) => {
            console.log(data);
            setValues(data);
            handleInput()
        })
        .catch(err => console.log(err));
    }

    const [items, setItems] = useState([]);
    useEffect(() => {
        axios.get("/bibliotecas").then((res) => {
            return res.data;
        })
        .then((data) => {
            console.log(data);
            setItems(data);
        });
    }, []);

    const handleInput = () => {
        values.map((value) => (row.push(createData(value.idSecao, value.siglaSecao, value.nomeSecao))))
    }

    const col = [
        { id: 'id', label: 'ID', minWidth: 50 },
        { id: 'sigla', label: 'Sigla', minWidth: 150 },
        { id: 'titulo', label: 'Nome da seção', minWidth: 250},
    ];

    const row = [];

    return(
        <Paper>
            <form className="containerForm">
                <div className='containerFormSearch'>
                    <div className="formInput" style={{width: '100%'}}>
                        <div className="labelForm"> Selecione a biblioteca </div>
                        <select name="idBiblioteca" className='inputForm' onChange={e => setBiblioteca(e.target.value)}>
                            {items.map((item) => (
                                <option key={item.idBiblioteca} value={item.idBiblioteca}>
                                    {item.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Button onClick={handleSubmit} size="large" variant="contained" sx={{textTransform: 'none', marginTop: '26px'}} startIcon={<IoSearchOutline />}>
                        Buscar
                    </Button>
                </div>                
            </form>
            { values.length > 0 ? handleInput() : <></> }
            { values.length > 0 ? 
            <div className="containerForm" style={{marginTop: "-100px"}}><CustomTable columns = {col} rows = {row} /></div>
            : <></> }
        </Paper>
    )
}

export default ReadSecao
