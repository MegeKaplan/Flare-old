import express from "express"
const router = express.Router()


// Import controllers
import { userCreate } from "../controllers/userController.js"

router.get("/register", (req, res) => {
    res.render("register", {title:"register"})
})

router.post("/register", userCreate)

router.get("/login", (req, res) => {
    res.send("login")
})

export default router