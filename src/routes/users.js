import express from "express"
const router = express.Router()


// Import controllers
import { userProfile } from "../controllers/userController.js"

// Import middlewares
import authMiddleware from "../middlewares/authMiddleware.js"



router.get("/*", authMiddleware)

router.get("/add", (req, res) => {
    res.send("add user")
})

router.get("/delete", (req, res) => {
    res.send("delete user")
})


router.get("/:id", userProfile)

export default router