const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const favicon = require('serve-favicon');
const Transaction = require('./models/transaction');

const app = express();
const PORT = 3000;

// Serve the favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Transactions API');
});

// Create a new transaction
app.post('/transactions', async (req, res) => {
  try {
    const { date, description, credit, debit } = req.body;
    const newTransaction = await Transaction.create(date, description, credit, debit);
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all transactions
app.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a transaction
app.put('/transactions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description, credit, debit } = req.body;
    const result = await Transaction.update(id, description, credit, debit);
    if (result.changes === 0) {
      res.status(404).json({ error: 'Transaction not found' });
    } else {
      res.status(200).json({ message: 'Transaction updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a transaction
app.delete('/transactions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Transaction.delete(id);
    if (result.changes === 0) {
      res.status(404).json({ error: 'Transaction not found' });
    } else {
      res.status(200).json({ message: 'Transaction deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
