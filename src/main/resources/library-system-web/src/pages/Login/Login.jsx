import React, { useState, useContext } from 'react';
import './Login.css';
import axios from "../../axiosInstance";
import { useAuth } from "./AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const { setToken, setUser } = useAuth();
    const navigate = useNavigate();
    
    function handleSubmit(e) {
        e.preventDefault();
        axios.get(`/usuarios/${email}`)
            .then(response => {
                    const { nome, role } = response.data;
                    axios.post('/auth', {
                        nome,
                        email,
                        senha,
                        role
                    }).then(response => { 
                        setUser(email);
                        setToken(response.data.token);
                        localStorage.setItem("token", response.data.token);
                        localStorage.setItem("email", email);
                        navigate("/busca");
                        console.log(response);
                    }).catch(err => console.log('Erro na autenticação:', err));
            }).catch(err => console.log('Erro ao obter dados do usuário:', err));
    }

    return (
        <div className="containerApp" style={{alignItems: "center", justifyContent: "center"}}>
            <section className="containerLogin">
                <div className="imageLogin">
                    <h1 className='loginTitle'>Library-system</h1>
                </div>
                <div className="infoLogin">
                    <h2>Login</h2>
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
                        <div className='formInput'>
                        <label>Senha</label>
                            <input 
                                className='inputForm'
                                type='password'
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)} 
                                placeholder='Digite sua senha'
                            />
                        </div>
                        <Button onClick={handleSubmit} variant="contained" fullWidth 
                            sx={{marginTop: "10px", marginBottom: "10px"}}>
                            Entrar
                        </Button>
                    </form>
                    <Divider />
                    <Button variant="outlined" sx={{marginTop: "10px", marginBottom: "10px"}}>
                        <Link to="/cadastro">
                            Crie uma conta
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default Login;