


const authMiddleware = (req, res, next) => {
    if(!req.cookies.currentUser == undefined){
        // console.log(req.cookies.currentUser);
        // console.log("user exist");
        // console.log(req.cookies.currentUser);
    }else{
        res.redirect("/auth/login")
    }
    next()
}


export default authMiddleware