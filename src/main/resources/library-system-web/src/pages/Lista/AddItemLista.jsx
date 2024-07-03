import { React, useState, useEffect } from 'react';
import axios from "../../axiosInstance";
import '../../components/form/FormSelect.css'
import '../../components/form/Form.css'
import { IoSearchOutline } from "react-icons/io5";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import FormInput from '../../components/form/FormInput';
import Button from '@mui/material/Button';

function AddItemLista(props) {
    const [email, setEmail] = useState(props.email)
    const [listas, setListas] = useState([])
    const [materiais, setMateriais] = useState([])
    
    const [values, setValues] = useState({
        idLista: 0,
        nomeMaterial: ""
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        const newValues = { ...values, [name]: value };
        setValues(newValues);
        console.log(newValues);  // Loga o valor atualizado
    }
    
    useEffect(() => {
        axios.get("/listas/" + email).then((res) => {
            return res.data;
        })
        .then((data) => {
            console.log(data);
            setListas(data);
        });

        axios.get("/materiais").then((res) => {
            return res.data;
        })
        .then((data) => {
            console.log(data);
            setMateriais(data);
        });

    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        axios.post('/itemLista', values)
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    return (
        <form>
            <div className="formInput" style={{width: '100%'}}>
                <div className="labelForm"> Lista </div>
                <select name="idLista" className='inputForm' onChange={handleInput}>
                    <option value="0">Selecione uma lista</option>
                    {listas.map((item) => (
                        <option key={item.idLista} value={item.idLista}>
                            {item.nomeLista}
                        </option>
                    ))}
                </select>
            </div>
            <div className="formInput" style={{width: '100%'}}>
                <div className="labelForm"> Material </div>
                <select name="nomeMaterial" className='inputForm' onChange={handleInput}>
                    {materiais.map((item) => (
                        <option key={item.idMaterial} value={item.titulo}>
                            {item.titulo}
                        </option>
                    ))}
                </select>
            </div>
            <div className='containerButton'>
                <Button onClick={handleSubmit} size="large" variant="contained" sx={{textTransform: 'none', marginTop: "25px"}}> 
                    Adicionar 
                </Button>
            </div>    
        </form>
    );
}

export default AddItemLista