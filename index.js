// Import modules
import express from "express"
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { join, dirname } from 'path'
import config from './src/config.js'
import "dotenv/config"

// Set express app
const app = express()

// Set view engine
app.set("view engine", "ejs")

// Set static paths
const __dirname = dirname(new URL(import.meta.url).pathname);
app.use(express.static("public"))
app.set('views', join(__dirname, 'src', 'views'))


// Import middlewares
import authMiddleware from "./src/middlewares/authMiddleware.js";

// Import routes
import users from "./src/routes/users.js"
import auth from "./src/routes/auth.js"
import feed from "./src/routes/feed.js"
import posts from "./src/routes/posts.js"

// Import services
import appwriteService from "./src/services/appwriteService.js";

// Import helpers
import { formatRelativeTime } from "./src/helpers/dateHelper.js";

// Use middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: -1
    }
}));
app.use(cookieParser());
app.use(cors())


// Use routes
app.use("/users", users, authMiddleware)
app.use("/auth", auth)
app.use("/feed", feed)
app.use("/posts", posts, authMiddleware)


// Render home
app.get("/", async (req, res) => {
    try {
        var currentUser = await appwriteService.getUser(req.cookies.currentUser.$id)
    } catch (error) {
        console.log("ERR:", error);
    }
    if(!currentUser){
        currentUser = {"$id": 0}
    }
    res.render("home", {
        currentUser: currentUser,
        users: await appwriteService.getUsers(),
        posts: await appwriteService.getPosts(),
        formatRelativeTime: formatRelativeTime
    })
})







// Listen port
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("server running at port "+PORT)
})