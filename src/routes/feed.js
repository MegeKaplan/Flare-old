import express from "express"
const router = express.Router()

// Import middlewares
import authMiddleware from "../middlewares/authMiddleware.js"


router.get("/", authMiddleware, (req, res) => {
    // res.send("Current user: "+req.cookies.currentUser.username)
    res.send("Hello")
})

// router.get("/", userGet)



export default router