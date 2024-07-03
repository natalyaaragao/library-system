import React from 'react'
import '../../components/form/Form.css'
import '../../components/table/Table.css'
import TextField from '@mui/material/TextField';
import CustomTable from '../../components/table/CustomTable'
import { Paper } from '@mui/material';

function createData(titulo, status, emprestimo, localizacao) {
    return {titulo, status, emprestimo, localizacao};
}

function ReadBusca() {
    const data = {
        nome: "Um curso de cálculo",
        autor: "Nome do autor",
        idioma: "Português",
        tipo: "Livro",
        dataPublicacao: 1987,
        formato: "4v",
        editor: "Rio de Janeiro",
        assuntos: "Cálculo Diferencial e Integral"
    }

    const col = [
        { id: 'titulo', label: 'Biblioteca', minWidth: 270 },
        { id: 'status', label: 'Status', minWidth: 100, tag: true, color: '#ccc' },
        { id: 'emprestimo', label: 'Empréstimo', minWidth: 100, tag: true, color: '#f1f1f1' },
        { id: 'localizacao', label: 'Localização', minWidth: 270 }
    ];

    const row = [
        createData('Biblioteca 1', 'Disponível', 'Sim', '24, 4.0'),
        createData('Biblioteca 2', 'Indisponível', 'Não', '37, 4.3'),
        createData('Biblioteca 3', 'Indisponível', 'Não', '24, 6.0'),
        createData('Biblioteca 4', 'Disponível', 'Sim', '67, 4.3'),
        createData('Biblioteca 5', 'Disponível', 'Não', '49, 3.9'),
    ];

    return (
        <section className="containerBody">
            <Paper>
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
            </Paper>
        </section>
        
    )
}

export default ReadBusca
