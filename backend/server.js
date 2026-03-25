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

// Start the server and KEEP IT ALIVE
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is awake and listening on port ${PORT}`);
});