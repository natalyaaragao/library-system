import { React, useState, useEffect } from 'react';
import axios from "../../axiosInstance";
import Card from '../../components/card/Card'
import '../../components/form/FormSelect.css'
import '../../components/form/Form.css'
import { IoSearchOutline } from "react-icons/io5";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CustomTable from '../../components/table/CustomTable'

function createData(titulo, tipo, autor, assunto) {
    return {titulo, tipo, autor, assunto};
}

function ReadMaterial() {
    const [material, setMaterial] = useState([]);

    const col = [
        { id: 'titulo', label: 'Título', minWidth: 270 },
        { id: 'tipo', label: 'Tipo', minWidth: 100, tag: true },
        { id: 'autor', label: 'Autor', minWidth: 200 },
        { id: 'assunto', label: 'Assunto', minWidth: 170 }
    ];

    const data = [
        createData('India', 'Livro', "1324171354", "3287263"),
        createData('China', 'Tese', "1403500365", "9596961"),
        createData('Italy', 'Livro', "60483973", "301340"),
        createData('United States', 'Livro', "327167434", "9833520"),
        createData('Canada', 'CA', 37602103, 9984670),
        createData('Australia', 'AU', 25475400, 7692024),
        createData('Germany', 'DE', 83019200, 357578),
        createData('Ireland', 'IE', 4857000, 70273),
        createData('Mexico', 'MX', 126577691, 1972550),
        createData('Japan', 'JP', 126317000, 377973),
        createData('France', 'FR', 67022000, 640679),
        createData('United Kingdom', 'GB', 67545757, 242495),
        createData('Russia', 'RU', 146793744, 17098246),
        createData('Nigeria', 'NG', 200962417, 923768),
        createData('Brazil', 'BR', 210147125, 8515767),
    ];

    function handleSubmit(e) {
        e.preventDefault();
        axios.get('/material/' + material).then((res) => {
            return res.data;
        })
        .then((data) => {
            console.log(data);
            setValues(data);
        })
        .catch(err => console.log(err));
    }

    return (
        <div>
            <CustomTable columns = {col} rows = {data} />
        </div>
    )
}

export default ReadMaterial;