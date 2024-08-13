/* my-app/src/List.tsx */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './Item';
import './List.css';

const List: React.FC = () => {
    const [items, setItems] = useState<{ isActive: boolean; description: string }[]>([]);
    const [newDescription, setNewDescription] = useState<string>('');

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
        const newItem = { isActive: true, description };
        axios.post('http://localhost:8080/listElement', newItem)
            .then(response => {
                setItems([...items, newItem]);
                window.location.reload();
            })
            .catch(error => {
                console.error('There was an error adding the item!', error);
            });
    };

    return (
        <div className="list-container">
            {items.map((item, index) => (
                <Item
                    key={index}
                    isActive={item.isActive}
                    description={item.description}
                    id={index}
                />
            ))}
            <div className="add-item-container">
                <input
                    type="text"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Enter description"
                    className="add-item-input"
                />
                <button className="add-item-button" onClick={() => addItem(newDescription)}>+</button>
            </div>
        </div>
    );
};

export default List;