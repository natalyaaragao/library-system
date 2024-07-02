import React, { useState } from 'react';
import '../../components/form/Form.css'
import axios from "../../axiosInstance";
import FormInput from '../../components/form/FormInput';
import Button from '@mui/material/Button';

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
            width: '49%',
            required: true
        },
        {
            id: 2,
            name: "horarioFuncionamento",
            type: "text",
            placeholder: "Horário de Funcionamento",
            label: "Horário de Funcionamento",
            width: '49%',
            required: true
        },
        {
            id: 3,
            name: "telefone",
            type: "text",
            placeholder: "Telefone",
            //errorMessage: "Telefone inválido!",
            label: "Telefone",
            width: '49%',
            required: true
        },
        {
            id: 4,
            name: "email",
            type: "text",
            placeholder: "Email",
            //errorMessage: "Email inválido!",
            label: "Email",
            width: '49%',
            required: true
        },
        {
            id: 5,
            name: "site",
            type: "text",
            placeholder: "Site",
            //errorMessage: "Site inválido!",
            label: "Site",
            width: '49%',
            required: true
        },
        {
            id: 6,
            name: "assuntos",
            type: "text",
            placeholder: "Assuntos",
            label: "Assuntos",
            width: '49%',
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
            width: '90%',
            required: true
        },
        {
            id: 3,
            name: "numero",
            type: "number",
            placeholder: "Número",
            label: "Número",
            width: '9%',
            required: true
        },
        
        {
            id: 4,
            name: "bairro",
            type: "text",
            placeholder: "Bairro",
            //errorMessage: "Bairro inválido!",
            label: "Bairro",
            width: '30%',
            required: true
        },
        {
            id: 5,
            name: "cidade",
            type: "text",
            placeholder: "Cidade",
            //errorMessage: "Cidade inválida!",
            label: "Cidade",
            width: '30%',
            required: true
        },
        {
            id: 2,
            name: "cep",
            type: "text",
            placeholder: "Cep",
            //errorMessage: "Cep inválido!",
            label: "Cep",
            width: '10%',
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
        console.log(values)
    }

    return (
        <div>
            <form className="containerForm">
                {inputs.map(
                    (input) => (
                    <FormInput
                        key = {input.id}
                        label = {input.label}
                        onChange = {handleInput}
                        style = {{ m: 1, width: input.width }}
                        value = {values[input.name]}
                        name = {input.name}
                        {...input}
                    />
                    )
                )}
                <div className="formInput" style={{width: '49%'}}>
                    <div className="labelForm"> Área do conhecimento </div>
                    <select name="areaConhecimento" className='inputForm' onChange={handleInput}>
                        {areaConhecimento.map((item) => (
                            <option key={item.id} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="formInput" style={{width: '49%'}}>
                    <div className="labelForm"> Área do conhecimento </div>
                    <select name="recursos" className='inputForm' onChange={handleInput}>
                        {recursos.map((item) => (
                            <option key={item.id} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                {inputsEndereco.map(
                    (input) => (
                    <FormInput
                        key = {input.id}
                        label={input.label}
                        onChange={handleInput}
                        style={{ width: input.width }}
                        value = {values[input.name]}
                        name = {input.name}
                        {...input}
                    />
                    )
                )}
                <div className="formInput" style={{width: '27%'}}>
                    <div className="labelForm"> Estado </div>
                    <select name="estados" className='inputForm'>
                        {estados.map((item) => (
                            <option key={item.ID} value={item.Nome}>
                                {item.Nome}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='containerButton'>
                    <Button onClick={handleSubmit} variant="contained" size="large" sx={{marginTop: "25px", textTransform: 'none'}}>Enviar</Button>
                </div>
            </form>
            
        </div>
    );
};

export default AddBiblioteca;

const estados = [
    {
        "ID": "1",
        "Sigla": "AC",
        "Nome": "Acre"
    },
    {
        "ID": "2",
        "Sigla": "AL",
        "Nome": "Alagoas"
    },
    {
        "ID": "3",
        "Sigla": "AM",
        "Nome": "Amazonas"
    },
    {
        "ID": "4",
        "Sigla": "AP",
        "Nome": "Amapá"
    },
    {
        "ID": "5",
        "Sigla": "BA",
        "Nome": "Bahia"
    },
    {
        "ID": "6",
        "Sigla": "CE",
        "Nome": "Ceará"
    },
    {
        "ID": "7",
        "Sigla": "DF",
        "Nome": "Distrito Federal"
    },
    {
        "ID": "8",
        "Sigla": "ES",
        "Nome": "Espírito Santo"
    },
    {
        "ID": "9",
        "Sigla": "GO",
        "Nome": "Goiás"
    },
    {
        "ID": "10",
        "Sigla": "MA",
        "Nome": "Maranhão"
    },
    {
        "ID": "11",
        "Sigla": "MG",
        "Nome": "Minas Gerais"
    },
    {
        "ID": "12",
        "Sigla": "MS",
        "Nome": "Mato Grosso do Sul"
    },
    {
        "ID": "13",
        "Sigla": "MT",
        "Nome": "Mato Grosso"
    },
    {
        "ID": "14",
        "Sigla": "PA",
        "Nome": "Pará"
    },
    {
        "ID": "15",
        "Sigla": "PB",
        "Nome": "Paraíba"
    },
    {
        "ID": "16",
        "Sigla": "PE",
        "Nome": "Pernambuco"
    },
    {
        "ID": "17",
        "Sigla": "PI",
        "Nome": "Piauí"
    },
    {
        "ID": "18",
        "Sigla": "PR",
        "Nome": "Paraná"
    },
    {
        "ID": "19",
        "Sigla": "RJ",
        "Nome": "Rio de Janeiro"
    },
    {
        "ID": "20",
        "Sigla": "RN",
        "Nome": "Rio Grande do Norte"
    },
    {
        "ID": "21",
        "Sigla": "RO",
        "Nome": "Rondônia"
    },
    {
        "ID": "22",
        "Sigla": "RR",
        "Nome": "Roraima"
    },
    {
        "ID": "23",
        "Sigla": "RS",
        "Nome": "Rio Grande do Sul"
    },
    {
        "ID": "24",
        "Sigla": "SC",
        "Nome": "Santa Catarina"
    },
    {
        "ID": "25",
        "Sigla": "SE",
        "Nome": "Sergipe"
    },
    {
        "ID": "26",
        "Sigla": "SP",
        "Nome": "São Paulo"
    },
    {
        "ID": "27",
        "Sigla": "TO",
        "Nome": "Tocantins"
    }
];
