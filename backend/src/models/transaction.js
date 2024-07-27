const db = require('../config/database');

class Transaction {
  static create(date, description, credit, debit) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO Transactions (date, description, credit, debit) VALUES (?, ?, ?, ?)`,
        [date, description, credit, debit],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID, date, description, credit, debit });
          }
        }
      );
    });
  }

  static findAll() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Transactions`, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static update(id, description, credit, debit) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE Transactions SET description = ?, credit = ?, debit = ? WHERE id = ?`,
        [description, credit, debit, id],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ changes: this.changes });
          }
        }
      );
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.run(
        `DELETE FROM Transactions WHERE id = ?`,
        [id],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ changes: this.changes });
          }
        }
      );
    });
  }
}

module.exports = Transaction;
