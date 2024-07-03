import { useState, useEffect } from 'react';
import axios from "../../axiosInstance";
import Card from '../../components/card/Card'
import '../../components/form/FormSelect.css'
import '../../components/form/Form.css'
import { IoSearchOutline, IoTerminalSharp } from "react-icons/io5";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';

function FilterBiblioteca({filterText, cidade, items}) {
    const aux = [];

    items.forEach((i) => {
        if(cidade === "Todas") aux.push(i);
        else if ( cidade === i.cidade ) aux.push(i);
    });

    const newItems = [];

    aux.forEach((i) => {
        if (i.nome.toLowerCase().indexOf(filterText.toLowerCase()) === -1
            && i.assuntos.toLowerCase().indexOf(filterText.toLowerCase()) === -1
        ) return;
        
        newItems.push(i);
    });


    return(
        <div>
            {newItems.map(
                (item) => (
                    <Card 
                        key = {item.id} 
                        {...item} 
                    />
                )
            )}
        </div>
    );
}

function ReadBiblioteca() {
    const [items, setItems] = useState([]);
    const [city, setCity] = useState("Todas");
    const [filterText, setFilterText] = useState('');
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
        {value: 0, name: 'Todas'},
        {value: 1, name: 'Bauru'},
        {value: 2, name: 'Itu'},
        {value: 3, name: 'Lorena'},
        {value: 4, name: 'Piracicaba'},
        {value: 5, name: 'Pirassununga'},
        {value: 7, name: 'Ribeirão Preto'},
        {value: 8, name: 'São Carlos'},
        {value: 9, name: 'São Paulo'},
        {value: 10, name: 'São Sebastião'}
    ]
          
    return (
        <div className="containerCard" style={{marginBottom: "100px"}}>
            <form className='containerFormSearch'>
                <TextField
                    id="outlined-basic"
                    placeholder="Buscar por nome ou assunto"
                    variant="outlined"
                    fullWidth
                    sx={{m: 1}}
                    onChange={(e) => setFilterText(e.target.value)}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <IoSearchOutline color="action" />
                        </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    select
                    fullWidth
                    label="Cidade"
                    defaultValue={cidades[0].name}
                    onChange={e => setCity(e.target.value)}
                    name = "idCidade"
                    sx={{ m: 1, width: '48%' }}
                >
                    {cidades.map((option) => (
                        <MenuItem key={option.value} value={option.name}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
            </form>
            {   (items.length > 0) ? 
                <FilterBiblioteca filterText={filterText} cidade = {city} items = {items} />
                : <></> 
            }
        </div>
    );
};

export default ReadBiblioteca;