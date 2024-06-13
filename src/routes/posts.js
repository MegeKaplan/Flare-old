import express from "express"
const router = express.Router()

// Import services
import appwriteService from "../services/appwriteService.js"

// Import controllers
import { likePost, postCreate } from "../controllers/postController.js"

// Import middlewares
import authMiddleware from "../middlewares/authMiddleware.js"

// Set up multer
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// router.get("/*", authMiddleware)

router.get("/", (req, res) => {
    res.redirect("/")
})

router.get("/create", (req, res) => {
    res.render("newPost", {currentUser:req.cookies.currentUser})
})


router.post("/create", upload.single('postImage'), postCreate)

router.post("/:id/like", likePost)




export default router