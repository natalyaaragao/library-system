import { React, useState, useEffect } from 'react';
import axios from "../../axiosInstance";
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { IoPencil, IoTrashOutline } from "react-icons/io5";
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import MenuLista from './MenuLista';

function ReadLista(props) {
    const [email, setEmail] = useState(props.email)
    const [listas, setListas] = useState([])

    useEffect(() => {
        axios.get(`/listas/${email}`).then((res) => res.data)
        .then((data) => {
            setListas(data);
            data.forEach((lista) => {
                axios.get(`/itemLista/lista/${lista.idLista}`).then((res) => res.data)
                .then((items) => {
                    setListas((prevListas) => prevListas.map((l) =>
                        l.idLista === lista.idLista ? { ...l, itens: items } : l
                    ));
                })
                .catch(err => console.log(err));
            });
        })
        .catch(err => console.log(err));
    }, [email]);

    return (
        <div style={{marginBottom: "100px"}}>
            {listas.map((lista) => (
                <Paper key={lista.id} style={{ margin: '20px', padding: '10px' }}>
                    <div className='listTitle' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h3>{lista.nomeLista}</h3>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Chip label={lista.tipoLista} size="small" variant="outlined" style={{ marginRight: '10px' }} />
                            <MenuLista />
                        </div>
                    </div>
                    <List aria-label="materiais">
                        {lista.itens && lista.itens.map((item) => (
                            <div key={item.id}>
                                <ListItem>
                                    <p>{item.nomeMaterial}</p>
                                </ListItem>
                                <Divider variant="middle" component="li" />
                            </div>
                        ))}
                    </List>
                </Paper>
            ))}
        </div>
    );
}

export default ReadLista
