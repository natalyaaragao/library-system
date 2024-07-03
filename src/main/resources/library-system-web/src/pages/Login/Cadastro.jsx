import React, { useState } from "react";
import axios from "../../axiosInstance"; 
import './Login.css';
import { Button } from "@mui/material";

function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [senha, setSenha] = useState("");
    const role = "USER"

    function handleSubmitEmail(e) {
        e.preventDefault();
        axios.get('/logado/' + email, {
            email,
        }).then((res) => {
            return res.data;
        }).then((data) => {
            if(!data) {
                setValidEmail(true);
            } 
            console.log(data);
        })
        .catch(err => console.log(err))
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios.post('/usuarios', {
            nome,
            email,
            senha,
            role
        })
        .then(response => {
            navigate("/login");
            console.log(response);
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="containerApp">
                <section className="containerLogin">
                    <div className="imageLogin">
                        <h1 className="loginTitle">Library-system</h1>
                    </div>
                    <div className="infoLogin">
                        <h2>Cadastro</h2>
                        <form>
                            <div className='formInput'>
                                <label>Nome</label>
                                <input
                                    className='inputForm'
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    placeholder={email}
                                />
                            </div>
                            <div className='formInput'>
                                <label>Email</label>
                                <input
                                    className='inputForm'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={email}
                                />
                            </div>
                            <div className='formInput'>
                                <label>Senha</label>
                                <input
                                    className='inputForm'
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    placeholder='Digite sua senha'
                                    type="password" 
                                />
                            </div>
                            <Button onClick={handleSubmit} variant="contained" fullWidth sx={{marginTop: "10px", marginBottom: "10px"}}>
                                Enviar
                            </Button>
                        </form> 
                    </div>
                </section>
            </div>
    )
}

export default Cadastro