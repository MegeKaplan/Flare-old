import express from "express"
const router = express.Router()

// Import services
import appwriteService from "../services/appwriteService.js"

// Import controllers
import { followUser, userCurrent, userProfile, userProfileEdit } from "../controllers/userController.js"

// Import middlewares
import authMiddleware from "../middlewares/authMiddleware.js"

// Set up multer
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



router.get("/*", authMiddleware)

router.get("/", (req, res) => {
    res.redirect("/")
})

router.get("/current", userCurrent)


router.get("/:id", userProfile)

router.get("/:id/edit", async (req, res) => {
    const userData = await appwriteService.getUser(req.params.id)
    res.render("profileEdit", {userData: userData})
})

router.post("/:id/edit", upload.single('profilePicture'), userProfileEdit)

router.get("/:id/follow", followUser)



export default router