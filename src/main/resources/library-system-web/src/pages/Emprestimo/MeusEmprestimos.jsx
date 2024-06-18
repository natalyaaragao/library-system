import React from 'react'
import '../../components/Body.css';
import CustomTable from '../../components/table/CustomTable'

function createData(id, titulo, devolucao, status) {
    let labelStatus = "";
    
    if (status === 1) labelStatus = "Regular"
    else if(status === 2) labelStatus = "Atrasado"
    else labelStatus = "Irregular"

    return {id, titulo, devolucao, labelStatus};
}

function MeusEmprestimos() {
    const col = [
        { id: 'id', label: 'ID', minWidth: 50 },
        { id: 'titulo', label: 'Título', minWidth: 270 },        
        { id: 'devolucao', label: 'Data de devolução', minWidth: 200 },
        { id: 'labelStatus', label: 'Status', minWidth: 100, tag: true },
    ];

    const data = [
        createData(561, 'Livro 1', '10/10/2024', 1),
        createData(20, 'Tese 20', '12/09/2024', 1),
        createData(200, 'Livro 5', '15/07/2024', 1),
        createData(150, 'Livro 10', '20/03/2024', 2),
        createData(19, 'Tese 10', '18/04/2024', 2),
        createData(73, 'Artigo 1054', '30/11/2024', 1),
        createData(14, 'Livro 12', '22/10/2024', 2),
    ];

    return (
        <section className="containerBody">
            <div className="containerTop">
                <h1>Meus empréstimos</h1>
            </div>
            
            <CustomTable columns = {col} rows = {data} />
        </section>
    )
}

export default MeusEmprestimos