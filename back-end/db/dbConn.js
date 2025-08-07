const express = require('express')

// Connection to MySQL ------------------------------------------------
const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS, 
  database: 'SISIII2025_89221168',
})

// Connecting to the database -----------------------------------------
conn.connect((err) => {
  if(err){
    console.log("ERROR: " + err.message);
    return;    
  }
  console.log('Connection established');
})

module.exports = conn;


