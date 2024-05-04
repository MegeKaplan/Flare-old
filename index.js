const express = require("express")
const app = express()
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');

const PORT = 3000

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.static("node_modules"))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: false }));




const mainRoutes = require('./routes/main');
app.use("/", mainRoutes)










app.listen(PORT, () => {
    console.log(`Server working on http://localhost:${PORT} address...`);
})