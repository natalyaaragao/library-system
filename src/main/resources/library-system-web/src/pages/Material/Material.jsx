import '../../components/Body.css';
import React from 'react'
import { useState } from "react";
import ReadMaterial from './ReadMaterial';
import AddMaterial from './AddMaterial'

function Material() {
    const [toggle, setToggle] = useState(true);
    const toggleChecked = (e) => {
        setToggle(toggle => !toggle)
    } 
    return (
        <section className="containerBody">
            <div className="containerTop">
                <h1> Material </h1>
                    {toggle && <button onClick={toggleChecked} className="inputButton">Consultar Material</button>}
                    {!toggle && <button onClick={toggleChecked} className="inputButton">Adicionar Material</button>}
            </div>
            {toggle && <AddMaterial /> }
            {!toggle && <ReadMaterial /> }
        </section>
    );
}

export default Material;