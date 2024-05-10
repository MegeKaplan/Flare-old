
import appwriteService from "../services/appwriteService.js";

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
    console.log("--------------TEST");
    const currentuser = await appwriteService.loginUser(req.body)
    console.log(currentuser);
    req.session.currentuser = currentuser
    res.sendStatus(200)
}

export const userGet = (req, res) => {
    appwriteService.getCurrentUser()
    res.sendStatus(200)
}






