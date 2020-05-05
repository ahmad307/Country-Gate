//  Backend
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
const { Pool, Client } = require('pg')

var fs = require('fs')
var http = require('http');
const connStr = 'postgressql://postgres:22870253Mm@localhost:5432/ui_db'




app.post('/login', (req, res) => {
  const client = new Client({
    connectionString: connStr
  })
  client.connect()
  console.log("res", req.body)
  // get from db 
  const query = {
    text: 'select id, password, name from public."user" where email = $1',
    values: [req.body['email']],
  }
  client.query(query, (err, result) => {
    console.log(err, result['rows'])
    client.end()
    console.log(result['rows'][0]['password'])
    if (result['rows'][0]['password'] == req.body['pass']) {
      return res.send({
        valid: true,
        id: result['rows'][0]['id'],
        name: result['rows'][0]['name'],
      })
    }
    else {
      res.send({
        valid: false,
        id: -1,
        name: "none"
      })
    }
  })

});


app.post('/registration', (req, res) => {
  const client = new Client({
    connectionString: connStr
  })
  client.connect()
  // get from db 
  const query = {
    text: 'select id from public."user" where email = $1',
    values: [req.body['email']],
  }
  client.query(query, (err, result_one) => {
    console.log(err, result_one['rows'].length)
    //client.end()

    if (result_one['rows'].length == 0) {

      const query2 = {
        text: 'insert into public."user" (name, email, password) values($1, $2, $3) RETURNING id',
        values: [req.body['name'], req.body['email'], req.body['pass']],
      }
      client.query(query2, (err, result) => {
        client.end()
        return res.send({
          valid: true,
          id: result['rows'][0]['id'],
          name: req.body['name'],
        })
      })

    }
    else {
      res.send({
        valid: false,
        id: -1,
        name: "none"
      })
    }
  })
});



app.get('/button2', (req, res) => {

  // get from db
  return res.send({
    name: "ahmad" // return db items here
  })
});

app.post('/likes', (req, res) => {
  const client = new Client({
    connectionString: connStr
  })
  client.connect()
  console.log("res", req.body)
  // get from db 
  const query = {
    text: 'select count(user_id) from public."sight" where name = $1',
    values: [req.body['name']],
  }
  client.query(query, (err, result) => {
    console.log(err, result['rows'])
    client.end()
    return res.send({ count: result['rows'][0]['count'] });

  })

});

app.post('/add_likes', (req, res) => {
  const client = new Client({
    connectionString: connStr
  })
  client.connect()
  console.log("res", req.body)
  // get from db 
  const query = {
    text: 'insert into public."sight" (name, user_id) values($1, $2)',
    values: [req.body['name'], req.body['id']],
  }
  client.query(query, (err, result) => {
    console.log(err, result)
    client.end()
    return res.send({ status: "Done" });

  })

});

app.listen(3000, () => {
  console.log('listening on 3000');
});

