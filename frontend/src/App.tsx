import React, { useEffect, useState } from 'react';
import './App.css';

const App: React.FC = () => {
    const [greeting, setGreeting] = useState<string>('');
    const [inventory, setInventory] = useState<any[]>([]);
    const [newItem, setNewItem] = useState({
        pokedex_id: '',
        nickname: '',
        level: '',
        attack: '',
        defense: '',
        height: '',
        weight: '',
    });
    const [editingItem, setEditingItem] = useState<any | null>(null);
    const [selectedType, setSelectedType] = useState<string>('');
    const [types, setTypes] = useState<any[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/greeting')
            .then(response => response.json())
            .then(data => setGreeting(data.message))
            .catch(error => console.error('Error fetching greeting:', error));

        fetchTypes();
        fetchInventory();
    }, []);

    const fetchTypes = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/types');
            const data = await response.json();
            setTypes(data);
        } catch (error) {
            console.error('Error fetching types:', error);
        }
    };

    const fetchInventory = async (type?: string) => {
        try {
            const response = await fetch(`http://localhost:3000/api/inventory${type ? `/filter/${type}` : ''}`);
            const data = await response.json();
            setInventory(data);
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewItem(prev => ({ ...prev, [name]: value }));
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const type = e.target.value;
        setSelectedType(type);
        fetchInventory(type);
    };

    const startEditing = (item: any) => {
        setEditingItem(item);
        setNewItem({
            pokedex_id: item.pokedex_id,
            nickname: item.nickname,
            level: item.level,
            attack: item.attack,
            defense: item.defense,
            height: item.height,
            weight: item.weight,
        });
    };

    const cancelEdit = () => {
        setEditingItem(null);
        setNewItem({ pokedex_id: '', nickname: '', level: '', attack: '', defense: '', height: '', weight: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingItem) {
                const response = await fetch(`http://localhost:3000/api/inventory/${editingItem.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newItem),
                });
                if (response.ok) {
                    cancelEdit();
                    fetchInventory(selectedType);
                }
            } else {
                const response = await fetch('http://localhost:3000/api/inventory', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newItem),
                });
                if (response.ok) {
                    fetchInventory(selectedType);
                    cancelEdit();
                }
            }
        } catch (error) {
            console.error('Error submitting item:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/api/inventory/${id}`, { method: 'DELETE' });
            if (response.ok) {
                fetchInventory(selectedType);
            }
        } catch (error) {
            console.error('Error deleting inventory item:', error);
        }
    };

    return (
        <div className="app-container">
            <h1>Pokedex</h1>
            <p>Welcome to your Pokemon Storage. Here is an inventory of all your pokemon stored in the PC.</p>

            <p>{greeting}</p>

            <div className="controls">
                <select className="type-select" value={selectedType} onChange={handleTypeChange}>
                    <option value="">Select a Type</option>
                    {types.map(type => (
                        <option key={type.type_name} value={type.type_name}>
                            {type.type_name}
                        </option>
                    ))}
                </select>
            </div>

            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>Pokemon</th>
                        <th>Nickname</th>
                        <th>Level</th>
                        <th>Attack</th>
                        <th>Defense</th>
                        <th>Height</th>
                        <th>Weight</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.nickname}</td>
                            <td>{item.level}</td>
                            <td>{item.attack}</td>
                            <td>{item.defense}</td>
                            <td>{item.height}</td>
                            <td>{item.weight}</td>
                            <td>
                                <button className="delete-btn" onClick={() => handleDelete(item.id)}>Release</button>
                                <button className="edit-btn" onClick={() => startEditing(item)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <form className="item-form" onSubmit={handleSubmit}>
                <h3>{editingItem ? 'Edit Item' : 'Add New Item'}</h3>
                {Object.keys(newItem).map((key) => (
                    <input
                        key={key}
                        type={key === 'nickname' ? 'text' : 'number'}
                        name={key}
                        placeholder={key.replace('_', ' ')}
                        value={(newItem as any)[key]}
                        onChange={handleInputChange}
                        required
                        readOnly={key === 'pokedex_id' && !!editingItem}
                    />
                ))}
                <button type="submit">{editingItem ? 'Update' : 'Add'}</button>
                {editingItem && <button type="button" onClick={cancelEdit}>Cancel</button>}
            </form>
        </div>
    );
};

export default App;
