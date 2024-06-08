
import appwriteService from "../services/appwriteService.js";
import config from "../config.js";

export const postCreate = async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    res.redirect("/posts/create")


    // set tags array
    // const tags = req.body.tags
    const tags = []

    // set post data
    const postData = {
        // required
        type: req.body.postType,
        title: req.body.title,
        content: req.body.content,
        tags: tags,
        sender: req.cookies.currentUser.$id,

        // defaults
        imageUrl: "",
        isDeleted: false,
        likes: [],
        saves: [],
        shares: [],
        comments: [],
    }



    // check file status
    if(postData.type != "text"){
        if(req.file){
            // upload post file
            var postPhotoData = appwriteService.uploadFile(config.appwrite.profilePhotosBucket, req.file)
            postData.imageUrl = postPhotoData.fileUrl
        }
    }else{
        console.log("type text");
    }

    


    const promise = await appwriteService.createPost(postData)
    console.log(promise);
}

