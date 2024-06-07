
import appwriteService from "../services/appwriteService.js";
import config from "../config.js";



export const userList = (req, res) => {
    res.render("users", {title: "Users"});
};

export const userProfile = async (req, res) => {
    const userData = await appwriteService.getUser(req.params.id)
    res.render("profile", {userData: userData, currentUser: req.cookies.currentUser})
};

export const userProfileEdit = async (req, res) => {
    const userData = await appwriteService.getUser(req.params.id)
    const editedUserData = {
        // email: req.body.email,
        // password: req.body.password, 
        // currentPassword: req.body.currentPassword
        username: req.body.username,
    }

    // edit user
    if(req.file){
        var ppData = appwriteService.uploadFile(config.appwrite.profilePhotosBucket, req.file)
        editedUserData.profilePhotoUrl = ppData.fileUrl
    }
    appwriteService.editUser(req.params.id, editedUserData)

    res.redirect("/users/"+req.params.id)
};

export const userCreate = (req, res) => {
    const userData = {
        ...req.body,
        profilePhotoUrl: "https://cloud.appwrite.io/v1/storage/buckets/6662b819001eb37c9631/files/6662be25001ec31e13d7/view?project=663554e7000097ac14d7" // default value
    }
    appwriteService.createUser(userData)
    res.redirect("/")
}

export const userLogin = async (req, res) => {
    const currentUser = await appwriteService.loginUser(req.body)
    res.cookie('currentUser', currentUser, { maxAge: config.cookie.maxAge, httpOnly: true })
    res.redirect("/")
}

export const userGet = async (req, res) => {
    const userData = await appwriteService.getUser(req.params.id)
    res.json(userData)
}






