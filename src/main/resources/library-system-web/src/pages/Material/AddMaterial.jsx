import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import '../../components/form/Form.css';
import axios from "../../axiosInstance";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';

function AddMaterial() {
    const [values, setValues] = useState( {
        idSecao: 0,
        titulo: "",
        descricao: "",
        tipoMaterial: "", 
        entradaPrincipal: "", 
        idioma: "",
        imprenta: "",
        edicao: "",
        nota: "",
        assunto: "",
        autorSecundario: ""
    });
    const [biblioteca, setBiblioteca] = useState();

    const inputs = [
        {
            id: 1,
            name: "titulo",
            type: "text",
            placeholder: "Título",
            label: "Título",
            width: '100%',
            required: true
        },
        {
            id: 2,
            name: "descricao",
            type: "text",
            placeholder: "Descrição",
            label: "Descrição",
            width: '20%',
            required: true,
            multiline: true,
            rows: 2
        },
        {
            id: 3,
            name: "nota",
            type: "text",
            placeholder: "Nota",
            label: "Nota",
            width: '20%',
            required: false,
            multiline: true,
            rows: 2
        },
        {
            id: 4,
            name: "imprenta",
            type: "text",
            placeholder: "Imprenta",
            label: "Imprenta",
            width: '48%',
            required: true
        },
        {
            id: 5,
            name: "edicao",
            type: "text",
            placeholder: "Edição",
            label: "Edição",
            width: '48%',
            required: true
        },
        {
            id: 6,
            name: "entradaPrincipal",
            type: "text",
            placeholder: "Autor principal",
            label: "Autor principal",
            width: '48%',
            required: true
        },
        {
            id: 7,
            name: "assunto",
            type: "text",
            placeholder: "Assunto",
            label: "Assunto",
            width: '48%',
            required: true
        },
        {
            id: 8,
            name: "autorSecundario",
            type: "text",
            placeholder: "Autor secundário",
            width: '48%',
            label: "Autor secundário",
        }
    ];

    function handleSubmit(e) {
        e.preventDefault();
        axios.post('/material', values)
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

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

    const [secao, setSecao] = useState([]);
    const handleBiblioteca = (e) => {
        setBiblioteca(e.target.value)
        e.preventDefault();
        axios.get('/secoes/biblioteca/' + items.idBiblioteca).then((res) => {
            return res.data;
        })
        .then((data) => {
            console.log(data);
            setSecao(data);
        })
        .catch(err => console.log(err));
    }
    
    return (
        <Paper>
            <form className="containerForm" onSubmit={handleSubmit}>
                <label> Biblioteca </label>
                <TextField
                    id="outlined-select-currency"
                    select
                    sx={{ width: "100%", backgroundColor: "#F3F5F7" }}
                    defaultValue="0"
                    onChange={handleBiblioteca}
                    name = "idBiblioteca"
                >
                    {items.map((option) => (
                        <MenuItem key={option.idBiblioteca} value={option.idBiblioteca}>
                        {option.nome}
                        </MenuItem>
                    ))}
                </TextField>
                <label> Seção </label>
                <TextField
                    id="outlined-select-currency"
                    select
                    sx={{ width: "100%", backgroundColor: "#F3F5F7" }}
                    defaultValue="0"
                    onChange={handleInput}
                    name = "idSecao"
                >
                    {secao.map((option) => (
                        <MenuItem key={option.idSecao} value={option.idSecao}>
                        {option.nomeSecao}
                        </MenuItem>
                    ))}
                </TextField>
                {inputs.map(
                    (input) => (
                        <div className='formInput'>
                            <label> {input.label} </label>
                            <OutlinedInput 
                                key = {input.id}
                                onChange={handleInput}
                                sx={{ width: "100%", backgroundColor: "#F3F5F7" }}
                                value = {values[input.name]}
                                name = {input.name}
                                multiline = {input.multiline}
                                rows={input.rows}
                            />
                        </div>
                    
                    )
                )}
                <div className='containerButton'>
                    <button className="inputButton">Enviar</button>
                </div>
            </form>
        </Paper>
    )
}

export default AddMaterial

/*
<TextField
                                key = {input.id}
                                label={input.label}
                                id="outlined-size-normal"
                                //defaultValue=" "
                                onChange={handleInput}
                                sx={{ m: 1, width: input.width, backgroundColor: "#ccc" }}
                                value = {values[input.name]}
                                name = {input.name}
                                multiline = {input.multiline}
                                rows={input.rows}
                                color="secondary"
                            />

*/