
import appwriteService from "../services/appwriteService.js";
import config from "../config.js";

export const userList = (req, res) => {
    res.render("users", {title: "Users"});
};

export const userProfile = (req, res) => {
    res.send(`user ${req.params.id} profile`)
};

export const userCreate = (req, res) => {
    appwriteService.createUser(req.body)
    res.sendStatus(200)
}

export const userLogin = async (req, res) => {
    const currentUser = await appwriteService.loginUser(req.body)
    res.cookie('currentUser', currentUser, { maxAge: config.cookie.maxAge, httpOnly: true })
    res.sendStatus(200)
}

export const userGet = (req, res) => {
    const currentUser = req.cookies.currentUser
    res.json(currentUser)
}






