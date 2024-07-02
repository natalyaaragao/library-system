import React, { useState, useEffect } from 'react'
import axios from "../../axiosInstance";
import '../../components/form/Form.css'
import '../../components/table/Table.css'
import TextField from '@mui/material/TextField';
import CustomTable from '../../components/table/CustomTable'
import { Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

function createData(titulo, status, emprestimo, localizacao) {
    return {titulo, status, emprestimo, localizacao};
}

export default function ResultadoMaterial() {
    const { id } = useParams();

    const [item, setItem] = useState([])
    useEffect(() => {
        axios.get(`/materialdetalhado/${id}`)
        .then((res) => res.data)
        .then((data) => {
            setItem(data);
            console.log(data)
        })
        .catch(err => console.log(err));
    }, [id]);

    const data = {
        nome: "Clean Code",
        autor: "Robert C. Martin",
        idioma: "Português",
        tipo: "Livro",
        dataPublicacao: 2012,
        formato: "4v",
        editor: "Prentice Hall",
        assuntos: "Desenvolvimento de Software"
    }

    const col = [
        { id: 'titulo', label: 'Biblioteca', minWidth: 270 },
        { id: 'status', label: 'Status', minWidth: 100, tag: true, color: '#ccc' },
        { id: 'emprestimo', label: 'Empréstimo', minWidth: 100, tag: true, color: '#f1f1f1' },
        { id: 'localizacao', label: 'Localização', minWidth: 270 }
    ];

    const row = [
        createData('IME – Instituto de Matemática e Estatística', 'Disponível', 'Sim', 'QA762 S449i e.2'),
        createData('IME – Instituto de Matemática e Estatística', 'Indisponível', 'Não', 'QA762 S449i e.3'),
        createData('IME – Instituto de Matemática e Estatística', 'Indisponível', 'Não', 'QA762 S449i e.4'),
    ];

    return (
        <section className="containerBody">
            <Paper>
                <div className="containerForm">
                    <h1>{data.nome}</h1>
                    <div>
                        <TextField
                            id="outlined-read-only-input"
                            label="Autor"
                            defaultValue={data.autor}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{ m: 1, width: '48%' }}
                        />
                        <TextField
                            id="outlined-read-only-input"
                            label="Idioma"
                            defaultValue={data.idioma}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{ m: 1, width: '18%' }}
                        />
                        <TextField
                            id="outlined-read-only-input"
                            label="Tipo de material"
                            defaultValue={data.tipo}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{ m: 1, width: '28%' }}
                        />
                        <TextField
                            id="outlined-read-only-input"
                            label="Data de publicação"
                            defaultValue={data.dataPublicacao}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{ m: 1, width: '18%' }}
                        />
                        <TextField
                            id="outlined-read-only-input"
                            label="Formato"
                            defaultValue={data.formato}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{ m: 1, width: '28%' }}
                        />
                        <TextField
                            id="outlined-read-only-input"
                            label="Editor"
                            defaultValue={data.editor}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{ m: 1, width: '48%' }}
                        />
                        <TextField
                            id="outlined-read-only-input"
                            label="Assuntos"
                            defaultValue={data.assuntos}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{ m: 1, width: '97%' }}
                        />
                    </div>
                    <CustomTable columns = {col} rows = {row} />
                </div>
                
            </Paper>
        </section>
    );
}
