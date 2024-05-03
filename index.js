const express = require("express")
const app = express()

const PORT = 3000

const db = require("./data/db")

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.static("node_modules"))


app.use("/", (req, res) => {
    db.execute("select * from users")
        .then(result => console.log(result))
        .catch(err => console.log(err))
    res.render("home")
})










app.listen(PORT, () => {
    console.log("server is running at port " + PORT);
})