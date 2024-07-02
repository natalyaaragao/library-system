import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import '../../components/form/Form.css';
import '../../components/form/FormInput.css'
import axios from "../../axiosInstance";
import FormInput from '../../components/form/FormInput';
import Button from '@mui/material/Button';

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
            id: 7,
            name: "assunto",
            type: "text",
            placeholder: "Assunto",
            label: "Assunto",
            width: '100%',
            required: true
        },
        {
            id: 2,
            name: "descricao",
            type: "text",
            placeholder: "Descrição",
            label: "Descrição",
            width: '49%',
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
            width: '49%',
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
            width: '49%',
            required: true
        },
        {
            id: 5,
            name: "edicao",
            type: "text",
            placeholder: "Edição",
            label: "Edição",
            width: '49%',
            required: true
        },
        {
            id: 6,
            name: "entradaPrincipal",
            type: "text",
            placeholder: "Autor principal",
            label: "Autor principal",
            width: '49%',
            required: true
        },
        {
            id: 8,
            name: "autorSecundario",
            type: "text",
            placeholder: "Autor secundário",
            width: '49%',
            label: "Autor secundário",
        },
        {
            id: 9,
            name: "idioma",
            type: "text",
            placeholder: "Idioma",
            width: '49%',
            label: "Idioma",
        },
        {
            id: 9,
            name: "tipoMaterial",
            type: "text",
            placeholder: "Tipo",
            width: '49%',
            label: "Tipo",
        }
    ];

    function handleSubmit(e) {
        e.preventDefault();
        axios.post('/materiais', values)
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
        e.preventDefault();
        const newBiblioteca = e.target.value;
        setBiblioteca(newBiblioteca);
        console.log(newBiblioteca);
        axios.get('/secoes/biblioteca/' + newBiblioteca).then((res) => {
            setSecao(res.data);
        })
        .catch(err => console.log(err));
    }
    
    return (
        <Paper>
            <form className="containerForm">
            <div className="formInput" style={{width: '100%'}}>
                <div className="labelForm"> Biblioteca </div>
                    <select name="biblioteca" className='inputForm' onChange={handleBiblioteca}>
                        {items.map((item) => (
                            <option key={item.idBiblioteca} value={item.idBiblioteca}>
                                {item.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="formInput" style={{width: '100%'}}>
                    <div className="labelForm"> Seção </div>
                    <select name="idSecao" className='inputForm' onChange={handleInput}>
                        {secao.map((item) => (
                            <option key={item.idSecao} value={item.idSecao}>
                                {item.nomeSecao}
                            </option>
                        ))}
                    </select>
                </div>
                {inputs.map(
                    (input) => (
                        <FormInput 
                            key = {input.id}
                            label = {input.label}
                            onChange={handleInput}
                            style={{ width: input.width }}
                            value = {values[input.name]}
                            name = {input.name}
                            multiline = {input.multiline}
                            {...input}
                        />                    
                    )
                )}
                <div className='containerButton'>
                    <Button onClick={handleSubmit} size="large" variant="contained" sx={{textTransform: 'none', marginTop: "25px"}}>Enviar</Button>
                </div>
            </form>
        </Paper>
    )
}

export default AddMaterial
