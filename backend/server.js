const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware: Allows React to talk to Node
app.use(cors());
app.use(express.json());

// TiDB Database Connection (Upgraded to Pool)
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

// Test the pool connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
        return;
    }
    console.log('✅ Successfully connected to TiDB Cloud (Pool Active)!');
    connection.release();
});

// A simple test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'The backend server is running perfectly!' });
});

app.get('/expenses', (req, res) => {
    db.query('SELECT * FROM expenses ORDER BY date DESC', (err, rows) => {
        if (err) {
            console.error('Error fetching expenses:', err.message);
            return res.status(500).json({ error: 'Failed to fetch expenses.' });
        }

        res.json(rows);
    });
});

app.post('/expenses', (req, res) => {
    const { amount, description, date, category_id } = req.body;

    if (!amount || Number(amount) <= 0) {
        return res.status(400).json({ error: 'Please provide a valid positive amount.' });
    }

    if (!description || !date || !category_id) {
        return res.status(400).json({ error: 'Description, date, and category are required.' });
    }

    const sql = 'INSERT INTO expenses (amount, description, date, category_id) VALUES (?, ?, ?, ?)';
    db.query(sql, [amount, description, date, category_id], (err, result) => {
        if (err) {
            console.error('Error saving expense:', err.message);
            return res.status(500).json({ error: 'Failed to save expense to database.' });
        }

        res.status(201).json({
            message: 'Expense saved successfully!',
            expenseId: result.insertId
        });
    });
});

// Start the server and KEEP IT ALIVE
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is awake and listening on port ${PORT}`);
});