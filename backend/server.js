const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware: Allows React to talk to Node
app.use(cors());
app.use(express.json());

// TiDB Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
    }
});

db.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
        return;
    }
    console.log('✅ Successfully connected to TiDB Cloud!');
});

// A simple test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'The backend server is running perfectly!' });
});

// ==========================================
// THE MISSING ROUTE: Save a new expense
// ==========================================
app.post('/expenses', (req, res) => {
    const { amount, description, date, category_id } = req.body;

    // Validate the data
    if (!amount || amount <= 0) {
        return res.status(400).json({ error: "Please provide a valid positive amount." });
    }
    if (!date || !category_id) {
        return res.status(400).json({ error: "Date and Category are required." });
    }

    // Insert into TiDB
    const sql = "INSERT INTO expenses (amount, description, date, category_id) VALUES (?, ?, ?, ?)";
    const values = [amount, description, date, category_id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error saving expense:", err);
            return res.status(500).json({ error: "Failed to save expense to database." });
        }
        
        res.status(201).json({ 
            message: "Expense saved successfully!", 
            expenseId: result.insertId 
        });
    });
});

// Start the server and KEEP IT ALIVE
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is awake and listening on port ${PORT}`);
});