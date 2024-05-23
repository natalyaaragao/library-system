import React from 'react'
import './Body.css'
import Form from '../form/Form'
import List from '../list/List'
import { useState } from "react";

const Body = () => {
    const [toggle, setToggle] = useState(true);
    const toggleChecked = (e) => {
        setToggle(toggle => !toggle)
    } 
    return (
        <section className="containerBody">
            <div className="containerTop">
                <h1> Biblioteca </h1>
                    {toggle && <button onClick={toggleChecked} className="btn">Consultar biblioteca</button>}
                    {!toggle && <button onClick={toggleChecked} className="btn">Adicionar biblioteca</button>}
            </div>
            {toggle && <Form /> }
            {!toggle && <List /> }
        </section>
    );
};

export default Body;
