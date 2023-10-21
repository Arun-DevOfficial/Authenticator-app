const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "users",
});

 
//Queries

module.exports = connection;
