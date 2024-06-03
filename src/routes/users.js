import express from "express"
const router = express.Router()

// Import services
import appwriteService from "../services/appwriteService.js"

// Import controllers
import { userProfile, userProfileEdit } from "../controllers/userController.js"

// Import middlewares
import authMiddleware from "../middlewares/authMiddleware.js"



router.get("/*", authMiddleware)

router.get("/:id", userProfile)

router.get("/:id/edit", async (req, res) => {
    const userData = await appwriteService.getUser(req.params.id)
    res.render("profileEdit", userData)
})

router.post("/:id/edit", userProfileEdit)


export default router