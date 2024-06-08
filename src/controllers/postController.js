
import appwriteService from "../services/appwriteService.js";
import config from "../config.js";

export const postCreate = (req, res) => {
    console.log(req.body);
    console.log(req.file);
    res.json(req.body)
}

