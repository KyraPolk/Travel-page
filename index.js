const pg = require('pg');
const client = new pg.Client('postgres://localhost/travel_page');
const express = require('express');
const app = express();
const path = require('path');

const homePage = path.join(__dirname, 'index.html');
app.get('/', (req, res)=> res.sendFile(homePage));

const reactApp = path.join(__dirname, 'dist/main.js');
app.get('/dist/main.js', (req, res)=> res.sendFile(reactApp));

const reactSourceMap = path.join(__dirname, 'dist/main.js.map');
app.get('/dist/main.js.map', (req, res)=> res.sendFile(reactSourceMap));

const styleSheet = path.join(__dirname, 'styles.css');
app.get('/styles.css', (req, res)=> res.sendFile(styleSheet));

const init = async()=> {
  await client.connect();
  console.log('connected to database');
  const SQL = `
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS countries;
    DROP TABLE IF EXISTS vacations;
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(100)
    );
    CREATE TABLE countries(
      id SERIAL PRIMARY KEY,
      name VARCHAR(100)
    );
    CREATE TABLE vacations(
      id SERIAL PRIMARY KEY,
      country_id INTEGER REFERENCES countries(id) NOT NULL,
      user_id INTEGER REFERENCES users(id) NOT NULL,
      created_at TIMESTAMP DEFAULT now()
    );
    INSERT INTO users(name) VALUES ('Kyra');
    INSERT INTO users(name) VALUES ('Jordan');
    INSERT INTO users(name) VALUES ('Aiesha');
    INSERT INTO users(name) VALUES ('Kyla');
    INSERT INTO users(name) VALUES ('Laura');
    INSERT INTO countries(name) VALUES ('Iceland');
    INSERT INTO countries(name) VALUES ('France');
    INSERT INTO countries(name) VALUES ('Costa Rica');
    INSERT INTO countries(name) VALUES ('Austrailia');
    INSERT INTO countries(name) VALUES ('Thailand');
  `;
  console.log('create your tables and seed data');

  const port = process.env.PORT || 2999;
  app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
  });
}

init();
