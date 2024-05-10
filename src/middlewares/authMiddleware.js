
import appwriteService from "../services/appwriteService.js"


const authMiddleware = (req, res, next) => {
    // appwriteService.getUser()
    next()
    // if (req.session && req.session.user) {
    //   next();
    // } else {
    //   // res.send("user not auth")
    //   next()
    //   // res.redirect('/auth/login');
    // }
}


export default authMiddleware