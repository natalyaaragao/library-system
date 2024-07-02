import { React, useState, useEffect } from 'react';
import axios from "../../axiosInstance";
import '../../components/form/FormSelect.css'
import '../../components/form/Form.css'
import { IoSearchOutline } from "react-icons/io5";
import FormInput from '../../components/form/FormInput';
import Button from '@mui/material/Button';

function AddItemEmprestimo() {
    /*const [email, setEmail] = useState("")
    const [usuario, setUsuario] = useState("")
    const [material, setMaterial] = useState()
    const [exemplar, setExemplar] = useState([])
    const [errorMessage, setErrorMessage] = useState("")

    const [values, setValues] = useState( {
        idItemMaterial: 0,
        idEmprestimo: 0,
        devolucao: "",
        status: 0,
        prazo: ""
    });

    const handleInput = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const [items, setItems] = useState([]);
    useEffect(() => {
        axios.get("/materiais").then((res) => {
            return res.data;
        })
        .then((data) => {
            console.log(data);
            setItems(data);
        });
    }, []);

    function handleMaterial(e) {
        e.preventDefault()
        console.log(material)
        axios.get("/exemplares/material/" + material).then((res) => {
            setExemplar(res.data)
            console.log(res.data)
        }).catch(
            err => {
                console.log(err)
                setErrorMessage("Exemplar não encontrado!")
                return
            }
        )
    }

    function handleConsulta(e) {
        e.preventDefault();
        axios.get("/emprestimos/consulta/" + usuario).then((res) => {
            return res.data;
        })
        .then((data) => {
            console.log(data)
            setValues(
                prevValues => ({
                    ...prevValues,
                    idEmprestimo: data.idEmprestimo
                })
            )
            setErrorMessage("")
            handleEmprestimo(e)
        })
        .catch(
            err => {
                console.log(err)
                setErrorMessage("Usuário sem cadastro para empréstimos!")
                return
            }
        )
    }

    function handleEmprestimo(e) {
        e.preventDefault()
        console.log(values)
        axios.post('/emprestimos', values)
            .then(response => console.log(response))
            .catch(err => console.log(err)
        )
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        axios.get("/usuarios/" + email).then((res) => {
            setUsuario(res.data.idUsuario)
            console.log(usuario)
            handleConsulta(e)
        }).catch(
            err => {
                console.log(err)
                setErrorMessage("Usuário não encontrado!")
                return
            }
        )

        
        /*axios.get("/usuarios/" + email).then((res) => {
            setValues({...values, ["idUsuario"]: res.data.idUsuario})
            console.log(values)
        })
    }

    return (
        <form>
            <FormInput 
                key = {0}
                label = "Email do usuário"
                onChange = {(e) => setEmail(e.target.value)}
                style={{ width: "100%" }}
                name = "email"
                value = {email}
            />
            <div className="formInput" style={{width: '100%'}}>
                <div className="labelForm"> Material </div>
                <select name="idMaterial" className='inputForm' onChange={e => {setMaterial(e.target.value); handleMaterial(e)}}>
                    {items.map((item) => (
                        <option key={item.idMaterial} value={item.idMaterial}>
                            {item.titulo}
                        </option>
                    ))}
                    <option value="valor1">Valor 1</option>
                    <option value="valor2">Valor 2</option>
                    <option value="valor3">Valor 3</option>
                </select>
            </div>
            <div className='containerFormSearch'>  
                <div className="formInput" style={{width: '100%'}}>
                    <div className="labelForm"> Exemplar </div>
                    <select name="idItemMaterial" className='inputForm' onChange={e => setValues(e.target.value)}>
                        {exemplar.map((item) => (
                            <option key={item.idItemMaterial} value={item.idItemMaterial}>
                                {item.localizacaoItem}
                            </option>
                        ))}
                        <option value="valor1">Valor 1</option>
                        <option value="valor2">Valor 2</option>
                        <option value="valor3">Valor 3</option>
                    </select>
                </div>
                <FormInput 
                    key = {0}
                    label = "Prazo"
                    onChange = {handleInput}
                    style={{ width: "20%" }}
                    name = "prazo"
                    value = {values["prazo"]}
                />
            </div>
            <div className='containerButton'>
                <Button onClick={handleSubmit} size="large" variant="contained" sx={{textTransform: 'none', marginTop: "25px"}}> Enviar </Button>
            </div>    
        </form>
    );*/
    const [email, setEmail] = useState("");
    const [usuario, setUsuario] = useState("");
    const [material, setMaterial] = useState("");
    const [exemplar, setExemplar] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [items, setItems] = useState([]);
    const [values, setValues] = useState({
        idItemMaterial: 0,
        idEmprestimo: 0,
        devolucao: "",
        status: 0,
        prazo: ""
    });

    const handleInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        axios.get("/materiais")
            .then((res) => res.data)
            .then((data) => {
                console.log(data);
                setItems(data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleMaterial = (e) => {
        e.preventDefault();
        axios.get("/exemplares/material/" + material)
            .then((res) => {
                setExemplar(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
                setErrorMessage("Exemplar não encontrado!");
            });
    };

    const handleConsulta = (e) => {
        e.preventDefault();
        axios.get("/emprestimos/consulta/" + usuario)
            .then((res) => res.data)
            .then((data) => {
                console.log(data);
                setValues(prevValues => ({
                    ...prevValues,
                    idEmprestimo: data.idEmprestimo
                }));
                setErrorMessage("");
                handleEmprestimo(e);
            })
            .catch(err => {
                console.log(err);
                setErrorMessage("Usuário sem cadastro para empréstimos!");
            });
    };

    const handleEmprestimo = (e) => {
        e.preventDefault();
        console.log(values);
        axios.post('/emprestimos', values)
            .then(response => console.log(response))
            .catch(err => console.log(err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get("/usuarios/" + email)
            .then((res) => {
                setUsuario(res.data.idUsuario);
                console.log(res.data.idUsuario);
                handleConsulta(e); // Chamar após garantir que o estado 'usuario' foi atualizado
            })
            .catch(err => {
                console.log(err);
                setErrorMessage("Usuário não encontrado!");
            });
    };

    return (
        <form>
            <div className='containerFormSearch'>
                <FormInput
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: "70%" }}
                    name="email"
                    value={email}
                    label = "Email do usuário"
                />

                <FormInput
                    onChange={handleInput}
                    name="prazo"
                    value={values.prazo}
                    style={{ width: "29%" }}
                    label="Prazo"
                />
            </div>
            <div className="formInput" style={{ width: '100%' }}>
                <div className="labelForm">Material</div>
                <select name="idMaterial" className='inputForm' onChange={e => { setMaterial(e.target.value); handleMaterial(e); }}>
                    {items.map((item) => (
                        <option key={item.idMaterial} value={item.idMaterial}>
                            {item.titulo}
                        </option>
                    ))}
                </select>
            </div>
            <div className='containerFormSearch'>
                <div className="formInput" style={{ width: '100%' }}>
                    <div className="labelForm">Exemplar</div>
                    <select name="idItemMaterial" className='inputForm' onChange={e => setValues({ ...values, idItemMaterial: e.target.value })}>
                        {exemplar.map((item) => (
                            <option key={item.idItemMaterial} value={item.idItemMaterial}>
                                {item.localizacaoItem}
                            </option>
                        ))}
                    </select>
                </div>
                
            </div>
            
            <div className='containerButton'>
                <Button onClick={handleSubmit} size="large" variant="contained" sx={{ textTransform: 'none', marginTop: "25px" }}>
                    Enviar
                </Button>
            </div>
        </form>
    );
}

export default AddItemEmprestimo

/*{errorMessage && <div className="error">{errorMessage}</div>} */