const express = require('express');
const router = express.Router()

const { login } = require("../controllers/auth")



router.get("/", (req, res) => {
    let userdata = req.cookies.userdata
    res.render("home", userdata)
})

router.get("/login", (req, res) => {
    res.render("login")
})

router.post("/login", async(req, res) => {
    var userdata = {
        username: req.body.username,
        password: req.body.password,
    }
    res.cookie("userdata", userdata, { maxAge: 900000, httpOnly: true });
    login(userdata)
    res.redirect("/")
})




module.exports = router