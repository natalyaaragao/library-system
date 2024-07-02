import { React, useState, useEffect } from 'react';
import axios from "../../axiosInstance";
import '../../components/form/FormSelect.css'
import '../../components/form/Form.css'
import { IoSearchOutline } from "react-icons/io5";
import FormInput from '../../components/form/FormInput';
import Button from '@mui/material/Button';

function AddUserEmprestimo() {
    const[email, setEmail] = useState("")
    const [values, setValues] = useState( {
        idUsuario: "",
        statusUsuario: 0,
        qtdItens: 0,
    });

    const inputs = [
        {
            id: 1,
            name: "email",
            type: "text",
            placeholder: "Email",
            label: "Email",
            errorMessage: "Campo obrigatório!",
            required: true,
            width: '100%'
        },
        {
            id: 2,
            name: "qtdItens",
            type: "number",
            placeholder: "Quantidade de itens",
            label: "Quantidade de itens",
            errorMessage: "Campo obrigatório!",
            required: true,
            width: '18%'
        }
    ]

    const handleInput = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios.get("/usuarios/" + email).then((res) => {
            setValues({...values, ["idUsuario"]: res.data.idUsuario})
            console.log(values)
        })
        axios.post('/emprestimos', values)
            .then(response => console.log(response))
            .catch(err => console.log(err)
        )
    }

    return (
        <form>
            <div className='containerFormSearch'>
                <FormInput 
                    key = {0}
                    label = "Email"
                    onChange = {(e) => setEmail(e.target.value)}
                    style={{ width: "80%" }}
                    name = "email"
                    value = {email}
                />
                <FormInput 
                    key = {0}
                    label = "Quantide de itens"
                    onChange = {handleInput}
                    style={{ width: "20%" }}
                    name = "qtdItens"
                    value = {values["qtdItens"]}
                />
                <div className="formInput" style={{width: '10%'}}>
                    <div className="labelForm"> Status </div>
                    <select name="statusUsuario" className='inputForm' onChange={handleInput}>
                        <option value="0">Regular</option>
                        <option value="1">Pendente</option>
                    </select>
                </div>
            </div>
            <div className='containerButton'>
                <Button onClick={handleSubmit} size="large" variant="contained" sx={{textTransform: 'none', marginTop: "25px"}}> Enviar </Button>
            </div>    
        </form>
    );
}

export default AddUserEmprestimo