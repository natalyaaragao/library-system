import React, { useState } from "react";
import axios from "../../axiosInstance"; 
import './Login.css';
import { Button } from "@mui/material";

function Cadastro() {
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [senha, setSenha] = useState("");
    let displayMessage = false;

    function handleSubmitEmail(e) {
        e.preventDefault();
        axios.get('/logado/' + email, {
            email,
        }).then((res) => {
            return res.data;
        }).then((data) => {
            if(!data) {
                setValidEmail(true);
            } else {
                displayMessage = true;    
            }
            console.log(data);
        })
        .catch(err => console.log(err))
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios.post('/login', {
            email,
            senha,
        })
        .then(response => {
            navigate("/biblioteca");
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
                        {validEmail ?
                            <form>
                                <div className='formInput'>
                                    <label>Email</label>
                                    <input
                                        className='inputForm'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={email}
                                        disabled 
                                    />
                                </div>
                                <div className='formInput'>
                                    <label>Senha</label>
                                    <input
                                        className='inputForm'
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        placeholder='Digite sua senha' 
                                    />
                                </div>
                                <button onClick={handleSubmit} className="btnEntar">Continuar</button>
                            </form> 
                            : 
                            <form>
                                <div className='formInput'>
                                    <label>Email</label>
                                    <input
                                        className='inputForm'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='Digite seu email' 
                                    />
                                </div>
                                <Button onClick={handleSubmitEmail} fullWidth variant="contained" sx={{marginTop: "10px", marginBottom: "10px"}}>
                                    Continuar
                                </Button>
                                {displayMessage ? <label>Esse email já existe!</label> : <></>}
                            </form> 
                        }
                    </div>
                    
                </section>
            </div>
  )
}

export default Cadastro