import { useState, useEffect } from 'react';
import axios from "../../axiosInstance";
import Card from '../../components/card/Card'
import '../../components/form/FormSelect.css'
import '../../components/form/Form.css'
import { IoSearchOutline } from "react-icons/io5";
import TextField from '@mui/material/TextField';
import CustomTable from '../../components/table/CustomTable'
import MenuItem from '@mui/material/MenuItem';

function createData(id, sigla, titulo) {
    return {id, sigla, titulo};
}

function ReadSecao() {
    const [values, setValues] = useState([]);

    const [biblioteca, setBiblioteca] = useState();
    function handleSubmit(e) {
        e.preventDefault();
        axios.get('/secoes/biblioteca/' + biblioteca).then((res) => {
            return res.data;
        })
        .then((data) => {
            console.log(data);
            setValues(data);
        })
        .then(
            
        )
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
        <div className="containerCard">
            <form className="containerFormSearch" onSubmit={handleSubmit}>
                <TextField
                    select
                    fullWidth
                    label="Selecione a biblioteca"
                    defaultValue="0"
                    onChange={e => setBiblioteca(e.target.value)}
                    name = "idBiblioteca"
                >
                    {items.map((option) => (
                        <MenuItem key={option.idBiblioteca} value={option.idBiblioteca}>
                        {option.nome}
                        </MenuItem>
                    ))}
                </TextField>
                <button className="inputButton"> Buscar </button>
            </form>
            { values.length > 0 ? handleInput() : <></> }
            { values.length > 0 ? <CustomTable columns = {col} rows = {row} /> : <></> }
        </div>
    )
}

export default ReadSecao