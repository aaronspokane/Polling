const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./Poll.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to Poll database.');
});


module.exports = db;
