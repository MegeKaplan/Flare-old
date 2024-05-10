// Import modules
import express from "express"
import session from 'express-session';
import cookieParser from 'cookie-parser';
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


// Use middlewares
app.use(authMiddleware)
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


// Use routes
app.use("/users", users)
app.use("/auth", auth)


// Render home
app.get("/", (req, res) => {
    res.render("home", {title: "Home"})
})







// Listen port
const port = process.env.port || 3000
app.listen(port, () => {
    console.log("server running at port "+port)
})