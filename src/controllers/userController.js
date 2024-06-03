
import appwriteService from "../services/appwriteService.js";
import config from "../config.js";

export const userList = (req, res) => {
    res.render("users", {title: "Users"});
};

export const userProfile = async (req, res) => {
    const userData = await appwriteService.getUser(req.params.id)
    res.render("profile", userData)
};

export const userCreate = (req, res) => {
    appwriteService.createUser(req.body)
    res.redirect("/")
}

export const userLogin = async (req, res) => {
    const currentUser = await appwriteService.loginUser(req.body)
    res.cookie('currentUser', currentUser, { maxAge: config.cookie.maxAge, httpOnly: true })
    res.redirect("/")
}

export const userGet = (req, res) => {
    const userData = {id:"dfd"}
    res.json(userData)
}






