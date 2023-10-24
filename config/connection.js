const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'Kopisusu1212',
  port: 5432,
  database: 'movies-database'
})

module.exports = pool;