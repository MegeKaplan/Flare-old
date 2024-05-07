
import appwriteService from "../services/appwriteService.js";

export const userList = (req, res) => {
    res.render("users", {title: "Users"});
};

export const userProfile = (req, res) => {
    res.send(`user ${req.params.id} profile`)
};

export const userCreate = (req, res) => {
    console.log("create user func");
    appwriteService.createUser(req.body)
    res.sendStatus(200)
}



