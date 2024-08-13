import React, { useState } from "react";
import axios from "axios";

interface ItemProps {
    id: number;
    isActive: boolean;
    description: string;
}

const Item: React.FC<ItemProps> = ({ id, isActive, description }) => {
    const [isActiveState, setIsActive] = useState<boolean>(isActive);

    const handleCheckboxChange = () => {
        const newStatus = !isActiveState;
        setIsActive(newStatus);

        axios.put(`http://localhost:8080/listElement/${id}`, {
            id: id,
            isActive: newStatus,
            description: description
        })
            .then(r => {
                console.log(r.data);
            })
            .catch(error => {
                console.error('There was an error updating the data!', error);
            });
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
        <div style={{border: '1px solid black', padding: '10px', margin: '10px'}}>
            <input
                type="checkbox"
                checked={!isActiveState}
                onChange={handleCheckboxChange}
            />
            <label>{isActiveState ? 'Not Done!' : 'Congratulations, done!'}</label>
            <p>{description}</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default Item;