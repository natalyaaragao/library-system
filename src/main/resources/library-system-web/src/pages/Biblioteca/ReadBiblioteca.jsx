import { useState, useEffect } from 'react';
import axios from "../../axiosInstance";
import Card from '../../components/card/Card'
import '../../components/form/FormSelect.css'
import '../../components/form/Form.css'
import { IoSearchOutline } from "react-icons/io5";

function ReadBiblioteca() {
    /*const items = [
        {
            id: 1, 
            nome: "BBM- Biblioteca Brasiliana Guita e José Mindlin",
            tel: "(11) 3091-1154 / 2648-0317",
            email: "biblioteca@bbm.usp.br",
            site: "https://www.brasiliana.usp.br",
            endereco: "Rua da Biblioteca, s/n - Cid. Universitária - 05508-050",
            cidade: "São Paulo",
            atendimento: "Administração - Segunda-feira a sexta-feira, das 8h às 17h. Pesquisa - Segunda-feira a sexta-feira, das 8h30 às 17h (Obs.: solicitação de documentos para consulta serão aceitas até as 16h). Exposições - Segunda-feira a sexta-feira, das 8h30 às 18h30. Sala de Leitura Lampadia - Segunda-feira a sexta-feira, das 9h às 17h / Sábado, das 9h às 13h",
            assuntos: "Brasiliana, História das Bibliotecas, Obras raras",
            areas: "Humanas"
        },
        {   id: 2, 
            nome: "CDCC – Centro de Divulgação Científica e Cultural",
            tel: "(11) 3091-1154 / 2648-0317",
            email: "bib@cdcc.usp.br, sbicdcc@cdcc.usp.br",
            site: "https://www.cdcc.usp.br/bibli",
            endereco: "Rua Nove de Julho, 1.227 - Centro - 13560-042",
            cidade: "São Carlos",
            atendimento: "2ª a 6ª (8h - 18h) - sáb. (9h - 12h)",
            assuntos: "Educação em Ciências, Generalidades",
            areas: "Biológicas, Exatas, Humanas"
        }
    ];*/
    const [items, setItems] = useState([]);
    const [city, setCity] = useState([]);
    const [area, setArea] = useState([]);
    useEffect(() => {
        axios.get("/bibliotecas").then((res) => {
            return res.data;
        })
        .then((data) => {
            console.log(data);
            setItems(data);
        });
    }, []);
    
    const cidades = [
        {value: '0', name: 'Cidade'},
        {value: '1', name: 'Bauru'},
        {value: '2', name: 'Itu'},
        {value: '3', name: 'Lorena'},
        {value: '4', name: 'Piracicaba'},
        {value: '5', name: 'Pirassununga'},
        {value: '6', name: 'Ribeirão Preto'},
        {value: '7', name: 'São Carlos'},
        {value: '8', name: 'São Paulo'},
        {value: '9', name: 'São Sebastião'}
    ]

    const areaC = [
        {value: '0', name: 'Área do conhecimento'},
        {value: '1', name: 'Humanas'},
        {value: '2', name: 'Exatas'},
        {value: '3', name: 'Biológicas'}
    ]

    return (
        <div className="containerCard">
            <form className='containerFormSearch'>
                <div className="formInput">
                    <select name={city} onChange={e => setCity(e.target.value)}>
                        {cidades.map((c) => (
                            <option value={c.value}>{c.name}</option>
                        ))}
                    </select>
                </div>
                <div className="formInput">
                    <select name={area} onChange={e => setArea(e.target.value)}>
                        {areaC.map((c) => (
                            <option value={c.value}>{c.name}</option>
                        ))}
                    </select>
                </div>
                <div className="formInput">
                    <span className="icon"><IoSearchOutline size={20} /></span>
                    <input type="text" placeholder='Buscar por nome ou assunto'/>
                </div>    
                <button className="inputButton"> Buscar </button>
            </form>
            {items.map(
                (item) => (
                    <Card 
                        key = {item.id} 
                        {...item} 
                    />
                )
            )}
        </div>
        
    );
};

export default ReadBiblioteca;