import { React, useState, useEffect } from 'react'
import axios from "../../axiosInstance";
import '../../components/form/FormSelect.css'
import '../../components/form/Form.css'
import { IoSearchOutline } from "react-icons/io5";
import FormInput from '../../components/form/FormInput';
import Button from '@mui/material/Button';

function ReadUserEmprestimo() {
    const[email, setEmail] = useState("")
    const[errorMessage, setErrorMessage] = useState("")
    const[usuario, setUsuario] = useState("")
    const [emprestimo, setEmprestimo] = useState( {
        idEmprestimo: 0,
        idUsuario: "",
        statusUsuario: 0,
        qtdItens: 0,
    });

    const handleInput = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        axios.get("/usuarios/" + email).then((res) => {
            setUsuario(res.data.idUsuario)
            console.log(usuario)
        }).catch(
            err => {
                console.log(err)
                setErrorMessage("Usuário não encontrado!")
                return
            }
        )

        axios.get("/emprestimos/consulta/" + usuario).then((res) => {
            return res.data;
        })
        .then((data) => {
            console.log(data)
            setEmprestimo(data)
            setErrorMessage("")
        })
        .catch(
            err => {
                console.log(err)
                setErrorMessage("Usuário sem cadastro para empréstimos!")
                return
            }
        )


        /*axios.post('/emprestimos', values)
            .then(response => console.log(response))
            .catch(err => console.log(err)
        )*/
    }

    return (
        <>
            <form>
                <FormInput 
                    key = {0}
                    label = "Email do usuário"
                    onChange = {(e) => setEmail(e.target.value)}
                    style={{ width: "100%" }}
                    name = "email"
                    value = {email}
                />
                <div className='containerButton'>
                    <Button onClick={handleSubmit} size="large" variant="contained" sx={{textTransform: 'none', marginTop: "25px"}}> Enviar </Button>
                </div>    
            </form>
            {(errorMessage.length > 0) ?
                <h3>{errorMessage}</h3>
                : <></>
            }
            
        </>
    );
}

export default ReadUserEmprestimo
