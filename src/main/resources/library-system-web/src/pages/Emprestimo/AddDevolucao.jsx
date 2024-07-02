import { React, useState, useEffect } from 'react';
import axios from "../../axiosInstance";
import '../../components/form/FormSelect.css'
import '../../components/form/Form.css'
import { IoSearchOutline } from "react-icons/io5";
import FormInput from '../../components/form/FormInput';
import Button from '@mui/material/Button';
import CustomTable from '../../components/table/CustomTable'

function createData(idItemEmprestimo, idItemMaterial, idEmprestimo, devolucao, status, prazo) {
    return {idItemEmprestimo, idItemMaterial, idEmprestimo, devolucao, status, prazo};
}

function AddDevolucao() {
    const [email, setEmail] = useState("")
    const [usuario, setUsuario] = useState("")
    const [material, setMaterial] = useState()
    const [exemplar, setExemplar] = useState()
    const [values, setValues] = ([])

    /*const [values, setValues] = useState({
        idItemMaterial: 0,
        idEmprestimo: 0,
        devolucao: "",
        status: 0,
        prazo: ""
    });*/

    function handleMaterial(e) {
        e.preventDefault()
        axios.get("/exemplares/material/" + material.idMaterial).then((res) => {
            setExemplar(res.data)
            console.log(res.data)
        }).catch(
            err => {
                console.log(err)
                setErrorMessage("Exemplar não encontrado!")
                return
            }
        )
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
            setValues(
                prevValues => ({
                    ...prevValues,
                    idEmprestimo: data.idEmprestimo
                })
            )
            setErrorMessage("")
        })
        .catch(
            err => {
                console.log(err)
                setErrorMessage("Usuário sem cadastro para empréstimos!")
                return
            }
        )

        /*axios.get("/usuarios/" + email).then((res) => {
            setValues({...values, ["idUsuario"]: res.data.idUsuario})
            console.log(values)
        })
        axios.post('/emprestimos', values)
            .then(response => console.log(response))
            .catch(err => console.log(err)
        )*/
    }

    const handleInput = () => {
        values.map((value) => (row.push(createData(value.idSecao, value.siglaSecao, value.nomeSecao))))
    }

    const col = [
        { id: 'idItemEmprestimo', label: 'ID', minWidth: 50 },
        { id: 'idItemMaterial', label: 'Sigla', minWidth: 150 },
        { id: 'idEmprestimo', label: 'Nome da seção', minWidth: 250},
        { id: 'devolucao', label: 'Sigla', minWidth: 150 },
        { id: 'status', label: 'Sigla', minWidth: 150 },
        { id: 'prazo', label: 'Sigla', minWidth: 150 }
    ];

    const row = [];

    return (
        <>
            <form className='containerFormSearch'>
                <FormInput 
                    key = {0}
                    label = "Email do usuário"
                    onChange = {(e) => setEmail(e.target.value)}
                    style={{ width: "100%" }}
                    name = "email"
                    value = {email}
                />
                <Button onClick={handleSubmit} size="large" variant="contained" sx={{textTransform: 'none'}}> 
                    Buscar 
                </Button>
            </form>
            <CustomTable columns = {col} rows = {row} />
        </>
    );
}

export default AddDevolucao