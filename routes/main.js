const express = require('express');
const router = express.Router()

const { login, register } = require("../controllers/auth")



router.get("/", (req, res) => {
    let userdata = req.cookies.userdata
    res.render("home", userdata)
})

router.get("/login", (req, res) => {
    res.render("login")
})

router.get("/register", (req, res) => {
    res.render("register")
})

router.post("/register", async(req, res) => {
    var userdata = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    }
    res.cookie("userdata", userdata, { maxAge: 900000, httpOnly: true });
    register(userdata)
    // res.redirect("/")
})




module.exports = router