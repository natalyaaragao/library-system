import React, { useState } from 'react';
import FormInput from '../../components/form/FormInput'
import '../../components/form/Form.css'

function AddBiblioteca() {
    const [values, setValues] = useState( {
        nome: "",
        horarioFuncionamento: "",
        telefone: "",
        email: ""
    });
    
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
            name: "horarioFuncionamento",
            type: "text",
            placeholder: "Horário de Funcionamento",
            label: "Horário de Funcionamento",
            required: true
        },
        {
            id: 3,
            name: "telefone",
            type: "text",
            placeholder: "Telefone",
            errorMessage: "Telefone inválido!",
            label: "Telefone",
            required: true
        },
        {
            id: 4,
            name: "email",
            type: "text",
            placeholder: "Email",
            errorMessage: "Email inválido!",
            label: "Email",
            required: true
        }
    ];

   const handleSubmit = (e) => {
        e.preventDefault();
    }

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    return (
        <div className="containerForm">
            <form onSubmit={handleSubmit}>
                {inputs.map(
                    (input) => (
                        <FormInput 
                            key = {input.id} 
                            {...input} 
                            value = {values[input.name]}
                            onChange={onChange}
                        />
                    )
                )}
                <button className="inputButton"> Enviar </button>
            </form>
            
        </div>
    );
};

export default AddBiblioteca;