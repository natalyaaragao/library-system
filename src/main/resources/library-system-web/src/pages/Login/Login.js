import React from 'react'
import './Login.css'

const Login = () => {

    return (
        <div className="containerApp">
            <section className="containerLogin">
                <div className="imageLogin">
                    <h1>Hello!</h1>
                </div>
                <div className="infoLogin">
                    <h2>Login</h2>
                    <label>Email</label>
                    <input placeholder='Digite seu email'></input>
                    <label>Senha</label>
                    <input type='password' placeholder='Digite sua senha'></input>
                    <button className="btnEntar">Entrar</button>
                    <button>Criar uma conta</button>
                </div>
            </section>
        </div>
        

    );
};

export default Login;