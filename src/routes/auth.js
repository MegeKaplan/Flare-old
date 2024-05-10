import express from "express"
const router = express.Router()


// Import controllers
import { userCreate, userLogin, userGet } from "../controllers/userController.js"

router.get("/register", (req, res) => {
    res.render("register", {title:"register"})
})
router.post("/register", userCreate)

router.get("/login", (req, res) => {
    res.render("login", {title:"login"})
})
router.post("/login", userLogin)

router.get("/getuser", userGet)

export default router