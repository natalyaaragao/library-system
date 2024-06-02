import React from 'react'
import '../../components/form/FormInput.css'
import '../../components/table/Table.css'

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

    return (
        <section className="containerBody">
            <div className="containerCard">
                <p>{data.nome}</p>
                <form>
                    <div div className="formInput">
                        <label>Autor</label>
                        <input type="text" value={data.autor} disabled/>
                    </div>
                    <div className="formInput">
                        <label>Idioma</label>
                        <input type="text" value={data.autor} disabled/>
                    </div>
                    <div className="formInput">
                        <label>Tipo</label>
                        <input type="text" value={data.tipo} disabled/>
                    </div>
                    <div className="formInput">
                        <label>Data de publicação</label>
                        <input type="text" value={data.dataPublicacao} disabled/>
                    </div>
                    <div className="formInput">
                        <label>Formato</label>
                        <input type="text" value={data.formato} disabled/>
                    </div>
                    <div className="formInput">
                        <label>Editor</label>
                        <input type="text" value={data.editor} disabled/>
                    </div>
                    <div className="formInput">
                        <label>Assuntos</label>
                        <input type="text" value={data.assuntos} disabled/>
                    </div>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Biblioteca</th>
                            <th>Status</th>
                            <th>Emprétimo</th>
                            <th>Localização</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nome da biblioteca</td>
                            <td>Disponível</td>
                            <td><p className='active'>Sim</p></td>
                            <td>Localização do item</td>
                        </tr>
                        <tr>
                            <td>Nome da biblioteca</td>
                            <td>Disponível</td>
                            <td><p className='active'>Sim</p></td>
                            <td>Localização do item</td>
                        </tr>
                        <tr>
                            <td>Nome da biblioteca</td>
                            <td>Disponível</td>
                            <td><p className='nonActive'>Não</p></td>
                            <td>Localização do item</td>
                        </tr>
                    </tbody>
                </table> 
            </div>
        </section>
        
    )
}

export default ReadBusca