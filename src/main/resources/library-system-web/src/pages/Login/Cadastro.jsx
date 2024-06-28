import React, { useState } from "react";
import axios from "../../axiosInstance"; 

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
                        <h1>Hello!</h1>
                    </div>
                    <div className="infoLogin">
                        <h2>Cadastro</h2>
                        {validEmail ?
                            <form onSubmit={handleSubmit}>
                                <label>Email</label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={email}
                                    disabled 
                                />
                                <label>Senha</label>
                                <input
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    placeholder='Digite sua senha' 
                                />
                                <button className="btnEntar">Continuar</button>
                            </form> 
                            : 
                            <form onSubmit={handleSubmitEmail}>
                                <label>Email</label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Digite seu email' 
                                />
                                <button className="btnEntar">Continuar</button>
                                {displayMessage ? <label>Esse email já existe!</label> : <></>}
                            </form> 
                        }
                    </div>
                    
                </section>
            </div>
  )
}

export default Cadastro