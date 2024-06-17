import React, { useState } from 'react';
import '../../components/form/Form.css'
import axios from "../../axiosInstance";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

function AddBiblioteca() {
    const [values, setValues] = useState( {
        nome: "",
        horarioFuncionamento: "",
        telefone: "",
        email: "",
        site: "",
        assuntos: "",
        areaConhecimento: "",
        recursos: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
    });
    
    const inputs = [
        {
            id: 1,
            name: "nome",
            type: "text",
            placeholder: "Nome",
            label: "Nome",
            width: '48%',
            required: true
        },
        {
            id: 2,
            name: "horarioFuncionamento",
            type: "text",
            placeholder: "Horário de Funcionamento",
            label: "Horário de Funcionamento",
            width: '48%',
            required: true
        },
        {
            id: 3,
            name: "telefone",
            type: "text",
            placeholder: "Telefone",
            errorMessage: "Telefone inválido!",
            label: "Telefone",
            width: '48%',
            required: true
        },
        {
            id: 4,
            name: "email",
            type: "text",
            placeholder: "Email",
            errorMessage: "Email inválido!",
            label: "Email",
            width: '48%',
            required: true
        },
        {
            id: 5,
            name: "site",
            type: "text",
            placeholder: "Site",
            errorMessage: "Site inválido!",
            label: "Site",
            width: '48%',
            required: true
        },
        {
            id: 6,
            name: "assuntos",
            type: "text",
            placeholder: "Assuntos",
            label: "Assuntos",
            width: '48%',
            required: false
        }
    ];

    const inputsEndereco = [
        {
            id: 1,
            name: "rua",
            type: "text",
            placeholder: "Rua",
            label: "Rua",
            width: '68%',
            required: true
        },
        {
            id: 2,
            name: "cep",
            type: "text",
            placeholder: "Cep",
            errorMessage: "Cep inválido!",
            label: "Cep",
            width: '17.5%',
            required: true
        },
        {
            id: 3,
            name: "numero",
            type: "number",
            placeholder: "Número",
            label: "Número",
            width: '8%',
            required: true
        },
        {
            id: 4,
            name: "bairro",
            type: "text",
            placeholder: "Bairro",
            errorMessage: "Bairro inválido!",
            label: "Bairro",
            width: '33.6%',
            required: true
        },
        {
            id: 5,
            name: "cidade",
            type: "text",
            placeholder: "Cidade",
            errorMessage: "Cidade inválida!",
            label: "Cidade",
            width: '30%',
            required: true
        },
        {
            id: 6,
            name: "estado",
            type: "text",
            placeholder: "Estado",
            errorMessage: "Estado inválido!",
            label: "Estado",
            width: '30%',
            required: true
        }
    ];

    const areaConhecimento = [
        { id: 1, name: 'Humanas'},
        { id: 2, name: 'Exatas'},
        { id: 3, name: 'Biológicas'}
    ];

    const recursos = [
        { id: 1, name: 'Sala de estudos 24 horas'},
        { id: 2, name: 'Caixa de devolução 24 horas'},
        { id: 3, name: 'Espaço de coworking'}
    ];

    function handleSubmit(e) {
        e.preventDefault();
        axios.post('/bibliotecas', values)
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    const handleInput = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <form className="containerForm" onSubmit={handleSubmit}>
            
                {inputs.map(
                    (input) => (
                    <TextField
                        key = {input.id}
                        label={input.label}
                        id="outlined-size-normal"
                        defaultValue=" "
                        onChange={handleInput}
                        sx={{ m: 1, width: input.width }}
                        value = {values[input.name]}
                        name = {input.name}
                    />
                    )
                )}
                <TextField
                    select
                    fullWidth
                    label="Área do conhecimento"
                    defaultValue=""
                    onChange={handleInput}
                    name = "areaConhecimento"
                    sx={{ m: 1, width: '48%' }}
                >
                    {areaConhecimento.map((option) => (
                        <MenuItem key={option.id} value={option.name}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    fullWidth
                    label="Recursos"
                    defaultValue=""
                    onChange={handleInput}
                    name="recursos"
                    sx={{ m: 1, width: '48%' }}
                >
                    {recursos.map((option) => (
                        <MenuItem key={option.id} value={option.name}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
                <p>Endereço</p>
                {inputsEndereco.map(
                    (input) => (
                    <TextField
                        key = {input.id}
                        label={input.label}
                        id="outlined-size-normal"
                        defaultValue=" "
                        onChange={handleInput}
                        sx={{ m: 1, width: input.width }}
                        value = {values[input.name]}
                        name = {input.name}
                    />
                    )
                )}
                <button className="inputButton">Enviar</button>
            </form>
            
        </div>
    );
};

export default AddBiblioteca;

