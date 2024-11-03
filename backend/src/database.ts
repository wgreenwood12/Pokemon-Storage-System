import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',      
    user: 'your_username',   
    password: 'your_password', 
    database: 'pokedex'       
});

export const db = pool.promise(); 
