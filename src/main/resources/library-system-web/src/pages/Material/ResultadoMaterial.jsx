import React, { useState, useEffect } from 'react'
import axios from "../../axiosInstance";
import '../../components/form/Form.css'
import '../../components/table/Table.css'
import TextField from '@mui/material/TextField';
import CustomTable from '../../components/table/CustomTable'
import { Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

function createData(titulo, status, localizacao) {
    if(status === 1) status = "Disponível"
    else status = "Indisponível"
    return {titulo, status, localizacao};
}

export default function ResultadoMaterial() {
    const { id } = useParams();

    const [item, setItem] = useState([{
        titulo: " ",
        entradaPrincipal: "",
        assunto: "",
        edicao: "",
        paginas: "",
        imprenta: "",
        colecao: "",
        nomeBiblioteca: "",
        statusItem: "",
        localizacaoItem: ""
    }])

    useEffect(() => {
        axios.get(`/materialdetalhado/${id}`)
        .then((res) => {
            setItem(res.data);            
        })
        .catch(err => console.log(err));
    }, [id]);

    const col = [
        { id: 'titulo', label: 'Biblioteca', minWidth: 270 },
        { id: 'status', label: 'Status', minWidth: 100, tag: true, color: '#ccc' },
        { id: 'localizacao', label: 'Localização', minWidth: 270, tag: true, color: '#f1f1f1' },
    ];

    const [row, setRow] = useState([]);

    const formatTableData = () => {
        return item.map(i => (
          createData(i.nomeBiblioteca, i.statusItem, i.localizacaoItem)
        ));
    };

    return (
        <section className="containerBody">
            {item.length > 0 ?
            <Paper>
                <div className="containerForm">
                    <h1> {item[0].titulo} </h1>
                    <div>
                        <TextField
                            id="outlined-read-only-input"
                            label="Autor"
                            value={item[0].entradaPrincipal}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{ m: 1, width: '48%' }}
                        />
                        <TextField
                            id="outlined-read-only-input"
                            label="Páginas"
                            value={item[0].paginas}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{ m: 1, width: '18%' }}
                        />
                        <TextField
                            id="outlined-read-only-input"
                            label="Edição"
                            value={item[0].edicao}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{ m: 1, width: '28%' }}
                        />
                        <TextField
                            id="outlined-read-only-input"
                            label="Editor"
                            value={item[0].imprenta}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{ m: 1, width: '48%' }}
                        />
                        <TextField
                            id="outlined-read-only-input"
                            label="Coleção"
                            value={item[0].colecao}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{ m: 1, width: '48%' }}
                        />
                        <TextField
                            id="outlined-read-only-input"
                            label="Assuntos"
                            value={item[0].assunto}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{ m: 1, width: '97%' }}
                        />
                    </div>
                    <CustomTable columns = {col} rows = {formatTableData()} />
                </div>
            </Paper>
            : <h1>Não há cadastro!</h1>}
        </section>
    );
}
