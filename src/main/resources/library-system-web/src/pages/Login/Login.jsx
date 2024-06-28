import React, { useState, useContext } from 'react';
import './Login.css';
import axios from "../../axiosInstance";
import { useAuth } from "./AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const { setToken } = useAuth();
    const navigate = useNavigate();
    
    function handleSubmit(e) {
        e.preventDefault();
        axios.post('/auth', {
            email,
            senha,
        })
        .then(response => {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
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
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Digite seu email' 
                        />
                        <label>Senha</label>
                        <input 
                            type='password'
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)} 
                            placeholder='Digite sua senha'
                        />
                        <button className="btnEntar">Entrar</button>
                    </form>
                    <button>
                        <Link to="/cadastro">
                            Crie uma conta
                        </Link>
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Login;