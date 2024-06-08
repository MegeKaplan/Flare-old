import express from "express"
const router = express.Router()

// Import middlewares
import authMiddleware from "../middlewares/authMiddleware.js"


router.get("/", authMiddleware, (req, res) => {
    res.json(req.cookies.currentUser)
})

// router.get("/", userGet)



export default router