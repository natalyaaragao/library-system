import { React, useState, useEffect } from 'react';
import axios from "../../axiosInstance";
import '../../components/form/FormSelect.css'
import '../../components/form/Form.css'
import { IoChevronDown } from "react-icons/io5";
import Paper from '@mui/material/Paper';
import FormInput from '../../components/form/FormInput';
import Button from '@mui/material/Button';

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddUserEmprestimo from './AddUserEmprestimo.jsx';
import AddItemEmprestimo from './AddItemEmprestimo.jsx';
import ReadUserEmprestimo from './ReadUserEmprestimo.jsx';
import AddDevolucao from './AddDevolucao.jsx';

function AddEmprestimo() {
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
            setValues({...values, [idUsuario]: res.data.idUsuario})
            console.log(values)
        })
        axios.post('/emprestimos', values)
            .then(response => console.log(response))
            .catch(err => console.log(err)
        )
    }

    return (
        <div style={{overflow: "auto", marginBottom: "100px"}}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<IoChevronDown />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <h3>Consultar usuário</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <ReadUserEmprestimo />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<IoChevronDown />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <h3>Adicionar informações do usuário</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <AddUserEmprestimo />
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<IoChevronDown />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    <h3>Adicionar item para empréstimo</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <AddItemEmprestimo />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<IoChevronDown />}
                    aria-controls="panel4-content"
                    id="panel4-header"
                >
                    <h3>Registrar devolução</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <AddDevolucao />
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default AddEmprestimo
