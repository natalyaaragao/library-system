import React, { useState } from 'react';
import FormInput from '../../components/form/FormInput'
import '../../components/form/Form.css'
import axios from "../../axiosInstance";

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
            style: {width: "42vw"},
            required: true
        },
        {
            id: 2,
            name: "horarioFuncionamento",
            type: "text",
            placeholder: "Horário de Funcionamento",
            label: "Horário de Funcionamento",
            style: {width: "30vw"},
            required: true
        },
        {
            id: 3,
            name: "telefone",
            type: "text",
            placeholder: "Telefone",
            errorMessage: "Telefone inválido!",
            label: "Telefone",
            style: {width: "23vw"},
            required: true
        },
        {
            id: 4,
            name: "email",
            type: "text",
            placeholder: "Email",
            errorMessage: "Email inválido!",
            label: "Email",
            style: {width: "25vw"},
            required: true
        },
        {
            id: 5,
            name: "site",
            type: "text",
            placeholder: "Site",
            errorMessage: "Site inválido!",
            label: "Site",
            style: {width: "23vw"},
            required: true
        },
        {
            id: 6,
            name: "assuntos",
            type: "text",
            placeholder: "Assuntos",
            label: "Assuntos",
            style: {width: "23vw"},
            required: false
        },
        {
            id: 7,
            name: "areaConhecimento",
            type: "text",
            placeholder: "Área do conhecimento",
            label: "Área do conhecimento",
            style: {width: "25vw"},
            required: true
        },
        {
            id: 8,
            name: "recursos",
            type: "text",
            placeholder: "Recursos",
            style: {width: "23vw"},
            label: "Recursos",
        }
    ];

    const inputsEndereco = [
        {
            id: 1,
            name: "rua",
            type: "text",
            placeholder: "Rua",
            label: "Rua",
            style: {width: "60vw"},
            required: true
        },
        {
            id: 2,
            name: "numero",
            type: "number",
            placeholder: "Número",
            label: "Número",
            style: {width: "12vw"},
            required: true
        },
        {
            id: 3,
            name: "bairro",
            type: "text",
            placeholder: "Bairro",
            errorMessage: "Bairro inválido!",
            label: "Bairro",
            style: {width: "25vw"},
            required: true
        },
        {
            id: 4,
            name: "cidade",
            type: "text",
            placeholder: "Cidade",
            errorMessage: "Cidade inválida!",
            label: "Cidade",
            style: {width: "25vw"},
            required: true
        },
        {
            id: 5,
            name: "estado",
            type: "text",
            placeholder: "Estado",
            errorMessage: "Estado inválido!",
            label: "Estado",
            style: {width: "10vw"},
            required: true
        },
        {
            id: 6,
            name: "cep",
            type: "text",
            placeholder: "Cep",
            errorMessage: "Cep inválido!",
            label: "Cep",
            style: {width: "10vw"},
            required: true
        }
    ]

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
                        <FormInput 
                            key = {input.id} 
                            {...input} 
                            value = {values[input.name]}
                            onChange={handleInput}
                        />
                    )
                )}
                <p>Endereço</p>
                {inputsEndereco.map(
                    (input) => (
                        <FormInput 
                            key = {input.id} 
                            {...input} 
                            value = {values[input.name]}
                            onChange={handleInput}
                        />
                    )
                )}
                <button className="inputButton">Enviar</button>
            </form>
            
        </div>
    );
};

export default AddBiblioteca;