const express = require('express');
const db = require('../db/db');
const app = express();
const ip = require("ip");

app.use(express.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/polls', (req, res) => {
  let _rows = [];
  try {
    db.all(`SELECT ID, Poll FROM Polls`, [], (err, rows) => {
      if (err) {
        console.log(err.message);
      } else {
        res.json(rows);
      }
    });
  } catch (err) {
    console.log(err.message);
    res.json(_rows);
  }
});

app.get('/answers/:id', (req, res) => {
  try {
    db.all(`SELECT * FROM Answers where Id = ?`, [req.params.id], (err, rows) => {
      if(err) {
          res.json([]);
      }
      res.json(rows);
    });
  } catch(err) {
    res.json([]);
  }
})

app.get('/polls/:id', (req, res) => {
  let sql = `SELECT * FROM Polls WHERE Id = ?`;
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      console.error(err.message);
      res.json([]);
    } else {
      res.json(row);
    }
  });
});

app.post('/createEdit', function(req, res) {
  let _response = '';
  const poll = req.body;
  const pollData = {question: poll.data.question, choices: poll.data.choices};
  try {
    if(poll.data.update)
    {
      db.run('UPDATE Polls SET Poll = ? WHERE Id = ?', [JSON.stringify(pollData), poll.data.id], (err) => {
        if (err) {
            res.json({success: false, msg: err.message});
        } else {
            res.json({success: true, msg: "Poll Updated"});
        }
      });

    } else {
      db.run('INSERT INTO Polls(ID, Poll) VALUES(?, ?)', [poll.Id, JSON.stringify(pollData)], (err) => {
        if (err) {
            res.json({success: false, msg: err.message});
        } else {
            res.json({success: true, msg: "Poll Created"});
        }
      });
  }

  } catch (err) {
    res.json({success: false, msg: err.message});
  }
});

function Answer(req, res) {

  return new Promise(function(resolve, reject) {

    const _agent = req.get('User-Agent');
    const _ip = ip.address();

    try {

      db.get("SELECT Id FROM Users WHERE Id = ?", [_ip], (err, row) => {
        if (err) {
          reject(err.message);
        } else {
          if (typeof row == "undefined") {
            db.run('INSERT INTO Users(ID, Info) VALUES(?, ?)', [_ip, _agent], (err) => {
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


app.post('/answers/create/:id', function(req, res) {
  const answer = Answer(req, res);
  const Id = req.params.id;
  const poll = req.body;
  answer.then(function(result) {
      return result;
    })
    .then(function(result) {
      db.run('INSERT INTO Answers(ID, Answer, User, Date) VALUES(?, ?, ?, ?)', [Id, poll.answer, result.Id, Date.now()], (err) => {
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
