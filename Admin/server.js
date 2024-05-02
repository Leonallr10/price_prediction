const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sf_eng'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database!');
});
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Route to handle form submission
app.post('/api/insert_predictions', (req, res) => {
    const { pdtName, storage, ram, pdtDatesPrices } = req.body;

    // Insert data into MySQL database
    const sql = 'INSERT INTO predictions (pdtName, storage, ram, pdtDatesPrices) VALUES (?, ?, ?, ?)';
    connection.query(sql, [pdtName, storage, ram, pdtDatesPrices], (err, result) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            res.status(500).send('Failed to insert predictions.');
            return;
        }
        console.log('Predictions inserted successfully.');
        res.status(200).send('Predictions inserted successfully.');
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
