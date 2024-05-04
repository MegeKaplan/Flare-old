const express = require("express")
const app = express()

const login = (userdata) => {
    console.log(userdata);
}

module.exports = {
    login
}