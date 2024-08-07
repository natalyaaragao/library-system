import { useState, useEffect } from 'react';
import axios from "../../axiosInstance";
import Card from '../../components/card/Card'
import '../../components/form/FormSelect.css'
import '../../components/form/Form.css'
import { IoSearchOutline } from "react-icons/io5";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import FormInput from '../../components/form/FormInput';
import Button from '@mui/material/Button';

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

    const inputs = [
        {
            id: 2,
            name: "nomeSecao",
            type: "text",
            placeholder: "Nome da seção",
            label: "Nome da seção",
            //errorMessage: "Campo obrigatório!",
            required: true,
            width: '100%'
        },
        {
            id: 3,
            name: "siglaSecao",
            type: "text",
            placeholder: "Sigla",
            //errorMessage: "Campo obrigatório!!",
            label: "Sigla",
            required: true
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
    console.log(values)
    return(
        <Paper>
            <form className="containerForm">
                <div className="formInput" style={{width: '100%'}}>
                    <div className="labelForm"> Biblioteca </div>
                    <select name="idBiblioteca" className='inputForm' onChange={handleInput}>
                        {items.map((item) => (
                            <option key={item.idBiblioteca} value={item.idBiblioteca}>
                                {item.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='containerFormSearch'>
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
                </div>
                <div className='containerButton'>
                    <Button onClick={handleSubmit} size="large" variant="contained" sx={{textTransform: 'none', marginTop: "25px"}}> Enviar </Button>
                </div>    
            </form>
        </Paper>
    )
}

export default AddSecao