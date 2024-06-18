import { React, useState, useEffect } from 'react';
import AddLista from './AddLista';
import ReadLista from './ReadLista';
import './Lista.css'

function Lista() {
    const [toggle, setToggle] = useState(true);
    const toggleChecked = (e) => {
        setToggle(toggle => !toggle)
    } 
    return (
        <section className="containerBody">
            <div className="containerTop">
                <h1> Listas </h1>
                    {toggle && <button onClick={toggleChecked} className="btn">Todas as listas</button>}
                    {!toggle && <button onClick={toggleChecked} className="btn">Adicionar Lista</button>}
            </div>
            {toggle && <AddLista /> }
            {!toggle && <ReadLista /> }
        </section>
    );
}

export default Lista