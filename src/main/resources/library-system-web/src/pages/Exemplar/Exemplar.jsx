import React, { useState, useEffect } from 'react';
import axios from "../../axiosInstance";
import '../../components/form/FormSelect.css'
import '../../components/form/Form.css'
import '../../components/Body.css';
import Paper from '@mui/material/Paper';
import FormInput from '../../components/form/FormInput';
import Button from '@mui/material/Button';

function Exemplar() {
    const [values, setValues] = useState( {
        idMaterial: 0,
        statusItem: 0,
        colecao: "",
        paginas: 0,
        numReservas: 0,
        codigoDeBarras: "",
        localizacaoItem: ""
    });

    const [idMaterial, setIdMaterial] = useState([]);

    const inputs = [
        {
            id: 2,
            name: "colecao",
            type: "text",
            placeholder: "Coleção",
            label: "Coleção",
            required: true,
            width: '50%'
        },
        {
            id: 3,
            name: "statusItem",
            type: "number",
            placeholder: "Status",
            label: "Status",
            required: true,
            width: '15%'
        },
        {
            id: 4,
            name: "paginas",
            type: "text",
            placeholder: "Páginas",
            label: "Páginas",
            required: true,
            width: '15%'
        },
        {
            id: 5,
            name: "numReservas",
            type: "text",
            placeholder: "Número de reservas",
            label: "Número de reservas",
            required: true,
            width: '15%'
        },
        {
            id: 6,
            name: "localizacaoItem",
            type: "text",
            placeholder: "Localização",
            label: "Localização",
            required: true,
            width: '49%'
        },
        {
            id: 7,
            name: "codigoDeBarras",
            type: "text",
            placeholder: "Código de barras",
            label: "Código de barras",
            required: true,
            width: '49%'
        }
    ]

    const handleInput = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const [items, setItems] = useState([]);
    useEffect(() => {
        axios.get("/materiais").then((res) => {
            return res.data;
        })
        .then((data) => {
            console.log(data);
            setItems(data);
        });
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        axios.post('/exemplares', values)
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }
    console.log(values)

    return(
        <section className="containerBody">
          <div className="containerTop">
              <h1> Exemplar </h1>
          </div>
        <Paper>
            <form className="containerForm">
                <div className="formInput" style={{width: '100%'}}>
                    <div className="labelForm"> Material </div>
                    <select name="idMaterial" className='inputForm' onChange={handleInput}>
                        {items.map((item) => (
                            <option key={item.idMaterial} value={item.idMaterial}>
                                {item.titulo}
                            </option>
                        ))}
                    </select>
                </div>
                    {inputs.map(
                        (input) => (
                            <FormInput 
                                key = {input.id}
                                label = {input.label}
                                onChange = {handleInput}
                                style={{ width: input.width }}
                                name = {input.name}
                                value = {values[input.name]}
                                multiline = {input.multiline}
                                {...input}
                            />
                        )
                    )}
                <div className='containerButton'>
                    <Button onClick={handleSubmit} size="large" variant="contained" sx={{textTransform: 'none', marginTop: "25px"}}> Enviar </Button>
                </div>    
            </form>
        </Paper>

      </section>
        
    );
}

export default Exemplar