import express, { Request, Response } from 'express';
import mysql, { Pool, PoolConnection, QueryError } from 'mysql2/promise';

const app = express();
app.use(express.json());

// MySQL connection configuration
const dbConfig = {
    host: 'mysql-3c6b224c-msu-5de2.a.aivencloud.com',
    user: 'avnadmin',
    password: 'AVNS_s_xng1w3lBmSFCP7FML',
    database: 'game_account_pos',
};
// Create a MySQL connection pool
const pool: Pool = mysql.createPool(dbConfig);

// Helper function to execute MySQL queries
async function executeQuery(query: string, params: any[]): Promise<any> {
    try {
        const connection: PoolConnection = await pool.getConnection();
        try {
            const [result] = await connection.query(query, params);
            return result;
        } finally {
            connection.release();
        }
    } catch (err) {
        console.error('Error executing query:', err);
        throw err;
    }
}

// API routes

// Users

// Create a new user
app.post('/users', async (req: Request, res: Response) => {
    const { username, password, email, role } = req.body;
    const query = 'INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)';
    try {
        const result = await executeQuery(query, [username, password, email, role]);
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all users
app.get('/users', async (req: Request, res: Response) => {
    const query = 'SELECT * FROM users';
    try {
        const result = await executeQuery(query, []);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a user
app.put('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, password, email, role } = req.body;
    const query = 'UPDATE users SET username = ?, password = ?, email = ?, role = ? WHERE id = ?';
    try {
        await executeQuery(query, [username, password, email, role, id]);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a user
app.delete('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?';
    try {
        await executeQuery(query, [id]);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Games

// Create a new game
app.post('/games', async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const query = 'INSERT INTO games (name, description) VALUES (?, ?)';
    try {
        const result = await executeQuery(query, [name, description]);
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all games
app.get('/games', async (req: Request, res: Response) => {
    const query = 'SELECT * FROM games';
    try {
        const result = await executeQuery(query, []);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a game
app.put('/games/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const query = 'UPDATE games SET name = ?, description = ? WHERE id = ?';
    try {
        await executeQuery(query, [name, description, id]);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a game
app.delete('/games/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const query = 'DELETE FROM games WHERE id = ?';
    try {
        await executeQuery(query, [id]);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Accounts

// Create a new account
app.post('/accounts', async (req: Request, res: Response) => {
    const { gameId, username, password, email, level, price } = req.body;
    const query = 'INSERT INTO accounts (game_id, username, password, email, level, price) VALUES (?, ?, ?, ?, ?, ?)';
    try {
        const result = await executeQuery(query, [gameId, username, password, email, level, price]);
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all accounts
app.get('/accounts', async (req: Request, res: Response) => {
    const query = 'SELECT * FROM accounts';
    try {
        const result = await executeQuery(query, []);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update an account
app.put('/accounts/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { gameId, username, password, email, level, price, isSold } = req.body;
    const query = 'UPDATE accounts SET game_id = ?, username = ?, password = ?, email = ?, level = ?, price = ?, is_sold = ? WHERE id = ?';
    try {
        await executeQuery(query, [gameId, username, password, email, level, price, isSold, id]);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete an account
app.delete('/accounts/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const query = 'DELETE FROM accounts WHERE id = ?';
    try {
        await executeQuery(query, [id]);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Orders

// Create a new order
app.post('/orders', async (req: Request, res: Response) => {
    const { accountId, userId, totalAmount } = req.body;
    const query = 'INSERT INTO orders (account_id, user_id, total_amount) VALUES (?, ?, ?)';
    try {
        const result = await executeQuery(query, [accountId, userId, totalAmount]);
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all orders
app.get('/orders', async (req: Request, res: Response) => {
    const query = 'SELECT * FROM orders';
    try {
        const result = await executeQuery(query, []);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update an order
app.put('/orders/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { accountId, userId, totalAmount } = req.body;
    const query = 'UPDATE orders SET account_id = ?, user_id = ?, total_amount = ? WHERE id = ?';
    try {
        await executeQuery(query, [accountId, userId, totalAmount, id]);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete an order
app.delete('/orders/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const query = 'DELETE FROM orders WHERE id = ?';
    try {
        await executeQuery(query, [id]);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});