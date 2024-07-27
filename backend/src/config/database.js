const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    db.run(
      `CREATE TABLE IF NOT EXISTS Transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        description TEXT NOT NULL,
        credit INTEGER,
        debit INTEGER,
        balance INTEGER
      )`,
      (err) => {
        if (err) {
          console.error('Error creating table', err.message);
        }
      }
    );
  }
});

module.exports = db;
