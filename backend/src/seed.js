// src/seed.js
const db = require('./config/database');

// Define the transactions with the balance column
const transactions = [
  { date: '2020-02-20', description: 'Misc Expenses', credit: null, debit: 3000, balance: 1215 },
  { date: '2020-02-18', description: 'Printing sheets for office documents', credit: null, debit: 284, balance: 4215 },
  { date: '2020-02-18', description: 'Snacks Party', credit: null, debit: 500, balance: 4500 },
  { date: '2020-02-17', description: 'Credited to Office Account', credit: 5000, debit: null, balance: 5000 }
];

// Function to create the table and insert data
function initializeDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Drop the table if it exists
      db.run("DROP TABLE IF EXISTS Transactions", (err) => {
        if (err) {
          console.error('Error dropping table:', err.message);
          return reject(err);
        }

        // Create the new table
        db.run("CREATE TABLE Transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL, description TEXT NOT NULL, credit INTEGER, debit INTEGER, balance INTEGER)", (err) => {
          if (err) {
            console.error('Error creating table:', err.message);
            return reject(err);
          }

          // Prepare the statement for inserting data
          const stmt = db.prepare("INSERT INTO Transactions (date, description, credit, debit, balance) VALUES (?, ?, ?, ?, ?)");

          // Insert each transaction
          transactions.forEach(txn => {
            stmt.run(txn.date, txn.description, txn.credit, txn.debit, txn.balance, (err) => {
              if (err) {
                console.error('Error inserting transaction:', err.message);
              }
            });
          });

          stmt.finalize((err) => {
            if (err) {
              console.error('Error finalizing statement:', err.message);
              return reject(err);
            }

            // Close the database
            db.close((err) => {
              if (err) {
                console.error('Error closing database:', err.message);
                return reject(err);
              }
              console.log('Database initialized successfully');
              resolve();
            });
          });
        });
      });
    });
  });
}

// Execute the database initialization
initializeDatabase().catch(err => {
  console.error('Error initializing database:', err.message);
});
