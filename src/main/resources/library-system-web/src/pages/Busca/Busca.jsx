import '../../components/Body.css';
import React from 'react'
import { useState } from "react";
import axios from "../../axiosInstance";
import Button from '@mui/material/Button';
import '../../components/form/Form.css'
import { IoSearchOutline } from "react-icons/io5";
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

function Busca() {
  const [post, setPost] = useState({
    nome: '',
    campoBusca: '',
    base: '',
    idioma: '',
    tipoMaterial: '',
  })

  const [nome, setNome] = useState([])
  const [base, setBase] = useState([])
  const [campoBusca, setCampoBusca] = useState([])
  const [idioma, setIdioma] = useState([])
  const [tipoMaterial, setTipoMaterial] = useState([])

  const bases = [
    {value: '0', name: 'Catálogo geral'},
    {value: '1', name: 'Biblioteca 1'},
    {value: '2', name: 'Biblioteca 2'},
    {value: '3', name: 'Biblioteca 3'},
  ]

  const camposBusca = [
    {value: '0', name: 'Todos os campos'},
    {value: '1', name: 'Título'},
    {value: '2', name: 'Autor'},
    {value: '3', name: 'Assunto'},
  ]

  const idiomas = [
    {value: '0', name: 'Todos'},
    {value: '1', name: 'Português'},
    {value: '2', name: 'Inglês'}
  ]

  const tiposMaterial = [
    {value: '0', name: 'Todos'},
    {value: '1', name: 'Livro'},
    {value: '2', name: 'Tese'},
    {value: '3', name: 'Artigo'},
  ]


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
      id: 3,
      name: "base",
      type: "text",
      placeholder: "Todos os campos",
      label: "Catálogo geral",
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
                <div className='containerFormSearch'>
                  <TextField
                      id="outlined-basic"
                      placeholder="Buscar por nome"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                          startAdornment: (
                          <InputAdornment position="start">
                              <IoSearchOutline color="action" />
                          </InputAdornment>
                          ),
                      }}
                      onChange={(event) => {
                        setNome(event.target.value);
                      }}
                  />
                </div>
                <div className='containerFormSearch'>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Idioma"
                  defaultValue="0"
                  onChange={(event) => {
                    setIdioma(event.target.value);
                  }}
                  sx={{ width: '15%' }}
                >
                  {idiomas.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Campo para busca"
                  defaultValue="0"
                  onChange={(event) => {
                    setCampoBusca(event.target.value);
                  }}
                  sx={{ width: '20%' }}
                >
                  {camposBusca.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Tipo de material"
                  defaultValue="0"
                  onChange={(event) => {
                    setTipoMaterial(event.target.value);
                  }}
                  sx={{ width: '20%' }}
                >
                  {tiposMaterial.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Base para busca"
                  defaultValue="0"
                  onChange={(event) => {
                    setBase(event.target.value);
                  }}
                  sx={{ width: '45%' }}
                >
                  {bases.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                  
                <Button variant="outlined" startIcon={<IoSearchOutline />}>
                  Buscar
                </Button>
                </div>
            </form>
          </div>
      </section>
  );
}

export default Busca;