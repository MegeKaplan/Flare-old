
import {userGet} from "../controllers/userController.js"


const authMiddleware = (req, res, next) => {
    if(req.cookies.currentUser){
        console.log("user exist");
    }else{
        res.redirect("/auth/login")
    }
    next()
}


export default authMiddleware