
import appwriteService from "../services/appwriteService.js";
import config from "../config.js";

export const postCreate = async (req, res) => {
    // console.log(req.body);
    // console.log(req.file);
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


export const likePost = async (req, res) => {
    const postData = await appwriteService.getPost(req.params.id)
    const currentUser = await appwriteService.getUser(req.cookies.currentUser.$id)


    const isUserLikesIncludesPostId = currentUser.likes.includes(postData.$id);
    const isPostLikesIncludesUserId = postData.likes.includes(currentUser.$id);    
    const isUserLiked = isUserLikesIncludesPostId & isPostLikesIncludesUserId

    
    if(!isUserLiked){
        appwriteService.updateDoc(config.appwrite.usersCollectionId, currentUser.$id, {likes: [...currentUser.likes, postData.$id]})
        appwriteService.updateDoc(config.appwrite.postsCollectionId, postData.$id, {likes: [...postData.likes, currentUser.$id]})
    } else{
        const newCurrentUserLikes = currentUser.likes.filter(id => id.toString() != postData.$id.toString());
        const newPostLikes = postData.likes.filter(id => id.toString() != currentUser.$id.toString());

        appwriteService.updateDoc(config.appwrite.usersCollectionId, currentUser.$id, {likes: newCurrentUserLikes})
        appwriteService.updateDoc(config.appwrite.postsCollectionId, postData.$id, {likes: newPostLikes})
    }
    


    res.send(postData)
}
