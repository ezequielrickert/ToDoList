import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './Item';

const List: React.FC = () => {
    const [items, setItems] = useState<{ isActive: boolean; description: string }[]>([]);
    const [newItem, setNewItem] = useState<string>('');

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

    return (
        <div>
            {items.map((item, index) => (
                <Item key={index} isActive={item.isActive} description={item.description} id={index}/>
            ))}
        </div>
    );
};

export default List;