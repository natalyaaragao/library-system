import { useState, useEffect } from 'react';
import axios from "../../axiosInstance";
import Card from '../../components/card/Card'
import '../../components/form/FormSelect.css'
import '../../components/form/Form.css'
import { IoSearchOutline } from "react-icons/io5";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import OutlinedInput from '@mui/material/OutlinedInput';

function AddSecao() {
    const [values, setValues] = useState( {
        idBiblioteca: 0,
        nomeSecao: "",
        siglaSecao: "",
    });

    const [biblioteca, getBiblioteca] = useState( {
        idBiblioteca: "",
        nome: ""
    });

    const bibliotecas = [
        { id: 0, name: ''},
        { id: 1, name: 'Humanas'},
        { id: 2, name: 'Exatas'},
        { id: 3, name: 'Biológicas'}
    ]

    const inputs = [
        {
            id: 2,
            name: "nomeSecao",
            type: "text",
            placeholder: "Nome da seção",
            label: "Nome da seção",
            errorMessage: "Campo obrigatório!",
            required: true,
            width: '100%'
        },
        {
            id: 3,
            name: "siglaSecao",
            type: "text",
            placeholder: "Sigla",
            errorMessage: "Campo obrigatório!",
            label: "Sigla",
            required: true,
            width: '100%'
        },
    ]

    const handleInput = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
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

    function handleSubmit(e) {
        e.preventDefault();
        axios.post('/secoes', values)
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    return(
        <Paper>
            <form className="containerForm" onSubmit={handleSubmit}>
                    <label>Selecione a biblioteca</label>
                    <TextField
                        id="outlined-select-currency"
                        select
                        fullWidth
                        defaultValue="0"
                        onChange={handleInput}
                        name = "idBiblioteca"
                    >
                        {items.map((option) => (
                            <MenuItem key={option.idBiblioteca} value={option.idBiblioteca}>
                            {option.nome}
                            </MenuItem>
                        ))}
                    </TextField>
                <div className='containerFormSearch'>
                    {inputs.map(
                        (input) => (
                            <div className='formInput'>
                                <label>{input.label}</label>
                                <OutlinedInput
                                    key = {input.id}
                                    id="outlined-size-normal"
                                    defaultValue=" "
                                    onChange={handleInput}
                                    name = {input.name}
                                    sx={{ width: input.width }}
                                />
                            </div>
                        )
                    )}
                </div>
                
                <div className='containerButton'>
                    <button className="inputButton"> Enviar </button>
                </div>    
            </form>
        </Paper>
    )
}

export default AddSecao