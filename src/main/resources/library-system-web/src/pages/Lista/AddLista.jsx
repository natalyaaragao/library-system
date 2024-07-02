import { React, useState, useEffect } from 'react';
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

function AddLista(props) {
    const [values, setValues] = useState( {
        email: props.email,
        nomeLista: "",
        tipoLista: ""
    });

    const inputs = [
        {
            id: 1,
            name: "nomeLista",
            type: "text",
            placeholder: "Nome da lista",
            label: "Nome da lista",
            width: '100%',
            required: true
        },
        {
            id: 7,
            name: "tipoLista",
            type: "text",
            placeholder: "Tipo de lista",
            label: "Tipo de lista",
            width: '40%',
            required: true
        }
    ];

    const handleInput = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios.post('/listas', values)
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    return (
        <form>
            <div className='containerFormSearch'>
                {inputs.map(
                    (input) => (
                        <FormInput 
                            key = {input.id}
                            label = {input.label}
                            onChange={handleInput}
                            style={{ width: input.width }}
                            value = {values[input.name]}
                            name = {input.name}
                        />                    
                    )
                )}
            </div>
            <div className='containerButton'>
                <Button onClick={handleSubmit} size="large" variant="contained" sx={{textTransform: 'none', marginTop: "25px"}}> Enviar </Button>
            </div>    
        </form>
    )
}

export default AddLista