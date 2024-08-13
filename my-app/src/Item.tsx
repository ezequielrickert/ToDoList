/* my-app/src/Item.tsx */
import React, { useState } from "react";
import axios from "axios";
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
        <div className="item-container">
            <div className="item-content">
                <input
                    type="checkbox"
                    checked={!isActiveState}
                    onChange={handleCheckboxChange}
                    className="custom-checkbox"
                />
                {isEditing ? (
                    <input
                        type="text"
                        value={descriptionState}
                        onChange={handleDescriptionChange}
                        className="item-editing-input"
                    />
                ) : (
                    <p className="description-input">{descriptionState}</p>
                )}
            </div>
            <div className="item-buttons">
                <button onClick={handleEdit} className="item-button edit">
                    {isEditing ? 'Save' : 'Edit'}
                </button>
                <button onClick={handleDelete} className="item-button delete">Delete</button>
            </div>
        </div>
    );
}

export default Item;