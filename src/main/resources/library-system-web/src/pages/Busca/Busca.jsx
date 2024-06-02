import '../../components/Body.css';
import React from 'react'
import { useState } from "react";
import axios from "../../axiosInstance";
import FormInput from '../../components/form/FormInput'
import '../../components/form/Form.css'

function Busca() {
  const [post, setPost] = useState({
    nome: '',
    campoBusca: '',
    base: '',
    idioma: '',
    tipoMaterial: '',
    baseDados: ''
  })

  const inputs = [
    {
        id: 1,
        name: "nome",
        type: "text",
        placeholder: "Nome",
        label: "Nome",
        required: true
    },
    {
      id: 2,
      name: "campoBusca",
      type: "text",
      placeholder: "Todos",
      label: "Campo para busca",
      required: false
    },
    {
      id: 3,
      name: "base",
      type: "text",
      placeholder: "Todos os campos",
      label: "Catálogo geral",
      required: false
    },
    {
      id: 4,
      name: "idioma",
      type: "text",
      placeholder: "Todos",
      label: "Idioma",
      required: false
    },
    {
      id: 5,
      name: "baseDados",
      type: "text",
      placeholder: "Todos",
      label: "Base de dados",
      required: false
    },
    {
      id: 6,
      name: "tipoMaterial",
      type: "text",
      placeholder: "Todos",
      label: "Tipo de material",
      required: false
    }
  ]
  const handleInput = (e) => {
      setPost({...post, [e.target.name]: e.target.value})
  }
  function handleSubmit(e) {
    e.preventDefault()
    axios.post('/autores', post)
        .then(response => console.log(response))
        .catch(err => console.log(err))
  }

  return (
      <section className="containerBody">
          <div className="containerTop">
              <h1> Busca </h1>
          </div>
          <div className="containerCard">
            <form onSubmit={handleSubmit}>
                {inputs.map(
                    (input) => (
                        <FormInput 
                            key = {input.id} 
                            {...input} 
                            value = {post[input.name]}
                            onChange={handleInput}
                        />
                    )
                )}
                <br/>
                <button>Enviar</button>
            </form>
          </div>
      </section>
  );
}

export default Busca;