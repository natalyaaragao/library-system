import { React, useState, useEffect } from 'react';
import axios from "../../axiosInstance"
import '../../components/form/FormSelect.css'
import '../../components/form/Form.css'
import { IoChevronDown } from "react-icons/io5"
import AddLista from './AddLista.jsx'
import AddItemLista from './AddItemLista.jsx'
import Accordion from '@mui/material/Accordion'
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';


function AddListasOp() {
    return (
        <div style={{overflow: "auto", marginBottom: "100px"}}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<IoChevronDown />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <h3>Criar lista</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <AddLista email = "user@email.com"/>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<IoChevronDown />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <h3>Adicionar item</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <AddItemLista email = "user@email.com"/>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default AddListasOp
