import React from 'react'
import './List.css'

const List = () => {
    const items = [
        {name: "IME – Instituto de Matemática e Estatística"},
        {name: "IMT – Instituto de Medicina Tropical de São Paulo"},
        {name: "IO – Instituto Oceanográfico"},
        {name: "IP – Instituto de Psicologia"},
        {name: "IQSC – Instituto de Química de São Carlos"}
    ]
    const listItems = items.map(
        item => 
        <div className="item">
            <p>{item.name}</p>
            <div className="btnGroup">
                <button className="btnItem">editar</button>
                <button className="btnItem">remover</button>
            </div>
        </div>
    )
    return (
        <section className="containerForm" >
            <p>Nome</p>
            {listItems}
        </section>    
    );
};

export default List;