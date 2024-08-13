import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent, Checkbox, TextField, Button, Box, Typography } from '@mui/material';
import './Item.css';

interface ItemProps {
    id: number;
    isActive: boolean;
    description: string;
}

const Item: React.FC<ItemProps> = ({ id, isActive, description }) => {
    const [isActiveState, setIsActive] = useState<boolean>(isActive);
    const [descriptionState, setDescriptionState] = useState<string>(description);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const handleCheckboxChange = () => {
        const newStatus = !isActiveState;
        setIsActive(newStatus);

        axios.put(`http://localhost:8080/listElement/${id}`, {
            id: id,
            isActive: newStatus,
            description: descriptionState
        })
            .then(r => {
                console.log(r.data);
            })
            .catch(error => {
                console.error('There was an error updating the data!', error);
            });
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescriptionState(e.target.value);
    };

    const handleEdit = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            axios.put(`http://localhost:8080/listElement/${id}`, {
                id: id,
                isActive: isActiveState,
                description: descriptionState
            })
                .then(r => {
                    console.log(r.data);
                })
                .catch(error => {
                    console.error('There was an error updating the data!', error);
                });
        }
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:8080/listElement/${id}`)
            .then(r => {
                console.log(r.data);
                window.location.reload();
            })
            .catch(error => {
                console.error('There was an error deleting the data!', error);
            });
    };

    return (
        <Card>
            <CardContent>
                <Box display="flex" alignItems="center">
                    <Checkbox
                        checked={!isActiveState}
                        onChange={handleCheckboxChange}
                    />
                    {isEditing ? (
                        <TextField
                            value={descriptionState}
                            onChange={handleDescriptionChange}
                            fullWidth
                        />
                    ) : (
                        <Typography variant="body1">{descriptionState}</Typography>
                    )}
                </Box>
                <Box display="flex" justifyContent="space-between" mt={2}>
                    <Button onClick={handleEdit} variant="contained" color="primary">
                        {isEditing ? 'Save' : 'Edit'}
                    </Button>
                    <Button onClick={handleDelete} variant="contained" color="secondary">
                        Delete
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

export default Item;