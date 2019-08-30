const express = require('express');
const database = new(require('../db/db'))();
const app = express();
const ip = require("ip");

app.use(express.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/polls', (req, res) => {
  let _response = '';
  let _rows = [];
  try {
    database.db.all(`SELECT ID, Poll FROM Polls`, [], (err, rows) => {
      if (err) {
        console.log(err.message);
      } else {
        res.send(JSON.stringify(rows));
      }
    });
  } catch (err) {
    console.log(err.message);
    res.send(JSON.stringify(_rows));
  }
});

app.get('/polls/:Id', (req, res) => {
  let sql = `SELECT Poll FROM Polls WHERE Id = ?`;
  database.db.get(sql, [req.params.Id], (err, row) => {
    if (err) {
      console.error(err.message);
    } else {
      res.send(JSON.stringify(row));
    }
  });
});

app.post('/create', function(req, res) {
  let _response = '';
  const poll = req.body;
  try {
    database.db.run('INSERT INTO Polls(ID, Poll) VALUES(?, ?)', [poll.Id, JSON.stringify(poll.data)], (err) => {
      if (err) {
        _response = err.message;
      } else {
        console.log('Row added...');
      }
    });

  } catch (error) {
    _response = error;
  }
  res.send(_response);
});

function Answer(req, res) {

  return new Promise(function(resolve, reject) {

    const _agent = req.get('User-Agent');
    const _ip = ip.address();

    try {

      database.db.get("SELECT Id FROM Users WHERE Id = ?", [_ip], (err, row) => {
        if (err) {
          reject(err.message);
        } else {
          if (typeof row == "undefined") {
            database.db.run('INSERT INTO Users(ID, Info) VALUES(?, ?)', [_ip, _agent], (err) => {
              if (err) {
                console.log(err.message);
                reject(err.message);
              } else {
                console.log('Row added!!');
                resolve({
                  Id: _ip,
                  agent: _agent
                });
              }
            });
          } else {
            console.log('Row found...');
            resolve({
              Id: _ip,
              agent: _agent
            });
          }
        }
      });
    } catch (error) {
      console.log(error.message);
      reject(error.message);
    }
  });
}


app.post('/answers/create/:Id', function(req, res) {
  const answer = Answer(req, res);
  const Id = req.params.Id;
  const poll = req.body;
  answer.then(function(result) {
      return result;
    })
    .then(function(result) {
      database.db.run('INSERT INTO Answers(ID, Answer, User) VALUES(?, ?, ?)', [Id, poll.answer, result.Id], (err) => {
        if (err) {
          res.send(err.message);
        } else {
          res.send("");
        }
      });
    })
    .catch(function(err) {
      console.log(err.message);
    });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
