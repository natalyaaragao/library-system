import '../../components/Body.css';
import React from 'react'
import AddBiblioteca from './AddBiblioteca'
import { useState } from "react";
import ReadBiblioteca from './ReadBiblioteca';
import Button from '@mui/material/Button';

function Biblioteca() {
  const [toggle, setToggle] = useState(true);
  const toggleChecked = (e) => {
      setToggle(toggle => !toggle)
  } 
  return (
      <section className="containerBody">
          <div className="containerTop">
              <h1> Biblioteca </h1>
                    {toggle &&
                        <Button onClick={toggleChecked} size="large" variant="contained" sx={{textTransform: 'none'}}>
                            Consultar biblioteca
                        </Button> 
                    }
                    {!toggle && 
                        <Button onClick={toggleChecked} size="large" variant="contained" sx={{textTransform: 'none'}}>
                            Adicionar biblioteca
                        </Button>}
          </div>
          {toggle && <AddBiblioteca /> }
          {!toggle && <ReadBiblioteca /> }
      </section>
  );
}

export default Biblioteca;
