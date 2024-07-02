import '../../components/Body.css';
import { React, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../axiosInstance";
import Button from '@mui/material/Button';
import '../../components/form/Form.css'
import { IoSearchOutline, IoEllipsisVerticalCircle  } from "react-icons/io5";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

function Busca() {
  const [titulo, setTitulo] = useState("")
  const [post, setPost] = useState([])

  function handleSubmit(e) {
    e.preventDefault()
    { titulo.length > 0 ?
      axios.get('/material/'+ titulo).then((res) => {
          setPost(res.data);
          console.log(res.data);
      }).catch(err => console.log(err))
      : axios.get('/materiais').then((res) => {
        setPost(res.data);
        console.log(res.data);
      }).catch(err => console.log(err))
    }
    
  }

  return (
      <section className="containerBody">
          <div className="containerTop">
              <h1> Busca </h1>
          </div>
          <div className="containerCard">
            <form>
                <div className='containerFormSearch'>
                  <TextField
                      placeholder="Buscar por nome"
                      fullWidth
                      InputProps={{
                          startAdornment: (
                          <InputAdornment position="start">
                              <IoSearchOutline color="action" />
                          </InputAdornment>
                          ),
                      }}
                      onChange={(event) => {
                        setTitulo((event.target.value).toLowerCase());
                      }}
                      sx={{
                        verticalAlign: "middle",
                        borderRadius: 2,
                        minHeight: "36px",
                        transition: "all 0.2s ease-in-out 0s",
                        fontSize: "16px",
                        lineHeight: "18px",
                        fontWeight: "normal"
                      }} 
                      size='small' 
                  />
                  <Button onClick={handleSubmit} variant="contained" size="medium" startIcon={<IoSearchOutline />}>
                    Buscar
                  </Button>
                </div>
            </form>
          </div>
          {post.map((item) => (
              <Paper key={item.idMaterial} sx={{marginTop: "15px", marginBottom: "15px"}}>
                <div className='listTitle' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h3>{item.titulo}</h3>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Chip label={item.tipoMaterial} size="small" variant="outlined" style={{ marginRight: '10px' }} />
                        <Link to={`/resultadoMaterial/${item.idMaterial}`}>
                            <IoEllipsisVerticalCircle />
                        </Link>
                        
                    </div>
                </div>
                <div>
                  <h3></h3>
                </div>
                <List aria-label="materiais">
                  <div>
                    <ListItem>
                          <p>Assunto: {item.assunto}</p>
                      </ListItem>
                      <Divider variant="middle" component="li" />
                  </div>
                  <div>
                    <ListItem>
                          <p>Autor: {item.entradaPrincipal}</p>
                      </ListItem>
                      <Divider variant="middle" component="li" />
                  </div>
                  <div>
                    <ListItem>
                          <p>Idioma: {item.idioma}</p>
                      </ListItem>
                      <Divider variant="middle" component="li" />
                  </div>
                  <div>
                    <ListItem>
                          <p>Edição: {item.edicao}</p>
                      </ListItem>
                      <Divider variant="middle" component="li" />
                  </div>
                </List>                    
              </Paper>
          ))}
      </section>
  );
}

export default Busca;

/*
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


*/