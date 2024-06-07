// Import modules
import express from "express"
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { join, dirname } from 'path'
import config from './src/config.js'

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

// Import services
import appwriteService from "./src/services/appwriteService.js";


// Use middlewares
app.use(express.urlencoded({extended:true}))
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
app.use("/users", users)
app.use("/auth", auth)
app.use("/feed", feed)


// Render home
app.get("/", async (req, res) => {
    var currentUser = req.cookies.currentUser
    if(!currentUser){
        currentUser = {"$id": 0}
    }
    console.log(currentUser);
    res.render("home", {currentUser: currentUser, users: await appwriteService.getUsers()})
})







// Listen port
const port = process.env.port || 3000
app.listen(port, () => {
    console.log("server running at port "+port)
})