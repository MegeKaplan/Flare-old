
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
        bio: req.body.bio,
    }

    // edit user
    if(req.file){
        var ppData = appwriteService.uploadFile(config.appwrite.profilePhotosBucket, req.file)
        editedUserData.profilePhotoUrl = ppData.fileUrl
    }
    // appwriteService.editUser(req.params.id, editedUserData)
    appwriteService.updateDoc(config.appwrite.usersCollectionId, req.cookies.currentUser["$id"], editedUserData)

    res.redirect("/users/"+req.params.id)
};

export const userCreate = (req, res) => {
    const userData = {
        ...req.body,
        profilePhotoUrl: "https://cloud.appwrite.io/v1/storage/buckets/6662b819001eb37c9631/files/6662be25001ec31e13d7/view?project=663554e7000097ac14d7", // default value
        bio:"",
        isAdmin:false,
        isDev:false,
        isVerified:false,
        followers:[],
        following:[],
        likes:[],
        saves:[],
        comments:[],
        posts:[],
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
    res.send(userData)
}

export const userCurrent = async (req, res) => {
    const userData = await appwriteService.getUser(req.cookies.currentUser.$id)
    res.json(userData)
}

export const followUser = async (req, res) => {
    const userData = await appwriteService.getUser(req.params.id)
    const currentUser = await appwriteService.getUser(req.cookies.currentUser.$id)


    const isCurrentUserFollowingIncludesUserId = currentUser.following.includes(userData.$id);
    const isUserFollowersIncludesCurrentUserId = userData.followers.includes(currentUser.$id);
    const isCurrentUserFollowing = isCurrentUserFollowingIncludesUserId & isUserFollowersIncludesCurrentUserId

    
    if(!isCurrentUserFollowing){
        appwriteService.updateDoc(config.appwrite.usersCollectionId, currentUser.$id, {following: [...currentUser.following, userData.$id]})
        appwriteService.updateDoc(config.appwrite.usersCollectionId, userData.$id, {followers: [...userData.followers, currentUser.$id]})
        
        setTimeout(() => {
            res.redirect("/users/"+req.params.id)
        }, 500);
    } else{
        const newCurrentUserFollowing = currentUser.following.filter(id => id.toString() != userData.$id.toString());
        const newUserFollowers = userData.followers.filter(id => id.toString() != currentUser.$id.toString());

        appwriteService.updateDoc(config.appwrite.usersCollectionId, currentUser.$id, {following: newCurrentUserFollowing})
        appwriteService.updateDoc(config.appwrite.usersCollectionId, userData.$id, {followers: newUserFollowers})

        setTimeout(() => {
            res.redirect("/users/"+req.params.id)
        }, 500);
    }
}





