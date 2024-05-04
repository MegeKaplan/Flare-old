const express = require("express")
const app = express()

const { Account, ID } = require("appwrite")

const client = require("../db/db_conn")
const account = new Account(client);

const register = (userdata) => {
    console.log(userdata);


    account.create(ID.unique(), userdata.email, userdata.password)
    .then(function (response) {
        console.log(response); // Success
        console.log("user registered successfully");
    }, function (error) {
        console.log(error.response.message); // Failure
        console.log("an error occurred");
    });

    
}

const login = (userdata) => {
    console.log("login func")
}

module.exports = {
    register,
    login
}