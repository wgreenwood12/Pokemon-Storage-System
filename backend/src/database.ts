import mysql from 'mysql2';
import dotenv from 'dotenv';
import { ResultSetHeader } from 'mysql2';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

export const db = pool.promise();

//Test
const testConnection = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM pokedex.inventory');
        console.log('Database connection successful:', rows);
    } catch (error) {
        console.error('Database connection failed:', error);
    }
};

// Get all inventory items
export const getInventory = async () => {
    const [rows] = await db.query('SELECT i.id, p.name, i.nickname, i.level, i.attack, i.defense, i.height, i.weight FROM pokedex.inventory i INNER JOIN pokedex.pokemon p ON i.pokedex_id = p.pokedex_id');
    return rows;
};

// Add
export const addInventoryItem = async (item: {
    pokedex_id: number;
    nickname: string;
    level: number;
    attack: number;
    defense: number;
    height: number;
    weight: number;
}) => {
    const { pokedex_id, nickname, level, attack, defense, height, weight } = item;
    const [result] = await db.query<ResultSetHeader>(
        'INSERT INTO pokedex.inventory (pokedex_id, nickname, level, attack, defense, height, weight) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [pokedex_id, nickname, level, attack, defense, height, weight]
    );

    return { insertId: result.insertId };
};
//Delete
export const deleteInventoryItem = async (id: number) => {
    await db.query('DELETE FROM pokedex.inventory WHERE id = ?', [id]);
};
//Edit
export const updateInventoryItem = async (id: number, item: {
    nickname: string;
    level: number;
    attack: number;
    defense: number;
    height: number;
    weight: number;
}) => {
    const { nickname, level, attack, defense, height, weight } = item;
    await db.query(
        'UPDATE pokedex.inventory SET nickname = ?, level = ?, attack = ?, defense = ?, height = ?, weight = ? WHERE id = ?',
        [nickname, level, attack, defense, height, weight, id]
    );
};

// Get all types
export const getTypes = async () => {
    const [rows] = await db.query('SELECT type_name FROM pokedex.types');
    return rows;
};

//CALLS STORED PROCEDURE TO FILTER BY TYPE
export const filterInventoryByType = async (type: string) => {
    const [rows] = await db.query(`CALL filter_types(?)`, [type]);
    return JSON.parse(JSON.stringify(rows))[0];
};


export { testConnection };
