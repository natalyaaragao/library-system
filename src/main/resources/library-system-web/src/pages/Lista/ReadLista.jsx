import { React, useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { IoPencil, IoTrashOutline } from "react-icons/io5";
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';

function ReadLista() {
  return (
    <div>
        <Paper>
            <div className='listTitle'>
                <div>
                    <h3>Nome do material</h3> 
                </div>
                <div>
                    <Chip label="Outros" size="small" variant="outlined" />
                    <IconButton aria-label="delete">
                        <IoPencil />
                    </IconButton>
                    <IconButton aria-label="delete">
                        <IoTrashOutline />
                    </IconButton> 
                </div>
            </div>
            <List aria-label="mailbox folders">
                <ListItem>
                    <p>Bibliografia</p>
                </ListItem>
                <Divider variant="middle" component="li" />
                <ListItem>
                    <ListItemText primary="Livro 1" />
                </ListItem>
                <Divider variant="middle" component="li" />
                <ListItem>
                    <ListItemText primary="Livro 2" />
                </ListItem>
                <Divider variant="middle" component="li" />
                <ListItem>
                    <ListItemText primary="Livro 3" />
                </ListItem>
                <Divider variant="middle" component="li" />
                <ListItem>
                    <ListItemText primary="Livro 4" />
                </ListItem>
            </List>
        </Paper>
    </div>
  )
}

export default ReadLista