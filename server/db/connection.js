const mysql = require('mysql2');

const connection = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"Amma@1982@bala",
    database:"blogs"
});

connection.connect((error)=>{
    if(error) throw error;
    console.log("Connected");
})

module.exports = connection;