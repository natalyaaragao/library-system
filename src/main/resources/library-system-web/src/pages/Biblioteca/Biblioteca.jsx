import '../../components/Body.css';
import React from 'react'
import AddBiblioteca from './AddBiblioteca'
import { useState } from "react";
import ReadBiblioteca from './ReadBiblioteca';

function Biblioteca() {
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
          {toggle && <AddBiblioteca /> }
          {!toggle && <ReadBiblioteca /> }
      </section>
  );
}

export default Biblioteca;
