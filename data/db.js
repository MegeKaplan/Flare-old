const mysql = require("mysql2")
const config = require("../config")
let connection = mysql.createConnection(config.db)

connection.connect((err) => {
    if(err){
        console.log(err);
    }


    console.log("connected to the database successfully");
})

module.exports = connection.promise()