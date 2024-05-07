import express from "express"
const router = express.Router()


// Import controllers
import { userList, userProfile } from "../controllers/userController.js"



router.get("/", userList)

router.get("/add", (req, res) => {
    res.send("add user")
})

router.get("/delete", (req, res) => {
    res.send("delete user")
})

router.get("/:id", userProfile)

export default router