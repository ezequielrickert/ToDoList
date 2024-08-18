import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './Item';
import { Container, Grid, TextField, Button, Box } from '@mui/material';


const List: React.FC = () => {
    const [items, setItems] = useState<{ isActive: boolean; description: string, id: number }[]>([]);
    const [newDescription, setNewDescription] = useState<string>('');
    const defaultListId = 1;

    useEffect(() => {
        axios.get('http://localhost:8080/listElement')
            .then(r => {
                setItems(r.data);
                console.log(r.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    const addItem = (description: string) => {
        const newItem = { isActive: true, description: description, list: defaultListId };
        axios.post('http://localhost:8080/listElement', newItem)
            .then(response => {
                window.location.reload();
            })
            .catch(error => {
                console.error('There was an error adding the item!', error);
            });
    };

    return (
        <Container>
            <Grid container spacing={2}>
                {items.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Item
                            isActive={item.isActive}
                            description={item.description}
                            id={item.id}
                        />
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <TextField
                            label="Enter description"
                            variant="outlined"
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            fullWidth
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => addItem(newDescription)}
                            style={{ marginLeft: '10px' }}
                        >
                            +
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default List;