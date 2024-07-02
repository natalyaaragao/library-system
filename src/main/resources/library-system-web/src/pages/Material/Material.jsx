import '../../components/Body.css';
import React from 'react'
import { useState } from "react";
import ReadMaterial from './ReadMaterial';
import AddMaterial from './AddMaterial'
import Button from '@mui/material/Button';

function Material() {
    const [toggle, setToggle] = useState(true);
    const toggleChecked = (e) => {
        setToggle(toggle => !toggle)
    } 
    return (
        <section className="containerBody">
            <div className="containerTop">
                <h1> Material </h1>
                    {toggle && <Button onClick={toggleChecked} size="large" variant="contained" sx={{textTransform: 'none'}}>Consultar Material</Button>}
                    {!toggle && <Button onClick={toggleChecked} size="large" variant="contained" sx={{textTransform: 'none'}}>Adicionar Material</Button>}
            </div>
            {toggle && <AddMaterial /> }
            {!toggle && <ReadMaterial /> }
        </section>
    );
}

export default Material;