import express, { Request, Response } from 'express';
import cors from 'cors';
import { testConnection, updateInventoryItem, getInventory, addInventoryItem, deleteInventoryItem, getTypes, filterInventoryByType } from './database';

const app = express();
app.use(cors());
app.use(express.json()); // For parsing application/json
const PORT = 3000;


// Get inventory
app.get('/api/inventory', async (req: Request, res: Response) => {
    try {
        const inventory = await getInventory();
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve inventory' });
    }
});

// Add
app.post('/api/inventory', async (req: Request, res: Response) => {
    try {
        const item = req.body;
        const result = await addInventoryItem(item);
        res.status(201).json({ message: 'Item added', itemId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add item' });
    }
});

// delete
app.delete('/api/inventory/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await deleteInventoryItem(Number(id));
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

//Edit
app.put('/api/inventory/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const item = req.body;
    try {
        await updateInventoryItem(Number(id), item);
        res.json({ message: 'Item updated' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update item' });
    }
});

// Get inventory filtered by type
app.get('/api/inventory/filter/:type', async (req: Request, res: Response) => {
    const { type } = req.params; // Get the type from the request parameters
    try {
        const inventory = await filterInventoryByType(type);
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to filter inventory' });
    }
});

// Get all types
app.get('/api/types', async (req: Request, res: Response) => {
    try {
        const types = await getTypes();
        res.json(types);
    } catch (error) {
        console.error('Failed to retrieve types:', error);
        res.status(500).json({ error: 'Failed to retrieve types' });
    }
});

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await filterInventoryByType('Grass'); 
});
