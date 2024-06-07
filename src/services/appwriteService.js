// appwriteService.js

import { Client, Databases, Storage, ID, Permission, Role, Account, Query, InputFile } from "node-appwrite";
import config from '../config.js';


const client = new Client();
client
    .setEndpoint(config.appwrite.endpoint)
    .setProject(config.appwrite.projectId)
    .setKey(config.appwrite.apiKey)
    .setSelfSigned(true)
    .setSession("")


const databases = new Databases(client);

const account = new Account(client);

const storage = new Storage(client);

const appwriteService = {
    // create user
    createUser: async (userdata) => {
        var auth = false

        // create account
        const userId = ID.unique()
        // const promise = await account.create(userId, userdata.email, userdata.password, userdata.username)
        const promise = await account.create(userId, userdata.email, userdata.password)
        .then(function (response) {
            // console.log(response);
            auth = true
        }, function (error) {
            console.log(error);
            auth = false
        });

        if(auth){
            try {
                const promise = databases.createDocument(
                    config.appwrite.databaseId,
                    config.appwrite.usersCollectionId,
                    userId,
                    userdata)
                return promise;
            } catch (error) {
                throw new Error(`An error occurred: ${error.message}`);
            }
        }

    },

    loginUser: async (userdata) => {
        // login user
        return await account.createEmailPasswordSession(userdata.email, userdata.password)
        .then(async function (response) {
            console.log(response); // Success

            // // get user data
            // databases.listDocuments(
            //     config.appwrite.databaseId,
            //     config.appwrite.usersCollectionId,
            //     [
            //         Query
            //         .equal("username", userdata.username)
            //         .equal("password", userdata.password)
            //     ]
            // )
            // .then((res) => {
            //     // save user data as a session
            //     console.log(res);
            //     var fulluserdata = res
            //     return fulluserdata
            // }, (err) => {
            //     console.log(err);
            // })

            // get user data
            return await databases.getDocument(
                config.appwrite.databaseId, // databaseId
                config.appwrite.usersCollectionId, // collectionId
                response.userId, // documentId
                [] // queries (optional)
            ).then((res) => {
                // console.log(res);
                return res
            }, (err) => {
                console.log(err);
            })
            
        }, function (error) {
            console.log(error); // Failure
        });
    },

    editUser: async (userID, editedUserData) => {
        // edit user document
        await databases.updateDocument(
            config.appwrite.databaseId, // databaseId
            config.appwrite.usersCollectionId, // collectionId
            userID, // documentId
            editedUserData,
        ).then((res) => {
            // console.log(res);
        }, (err) => {
            console.log(err);
        })
    },

    uploadProfilePhoto: (userId, file) => {
        // create unique id
        const ppId = ID.unique()

        // upload to storage
        storage.createFile(
            config.appwrite.profilePhotosBucket,
            ppId,
            InputFile.fromBuffer(file.buffer, file.originalname)
        ).then(async (response) => {
            console.log(response); // Success

            // get preview
            const result = await storage.getFileView(config.appwrite.profilePhotosBucket, ppId);
            console.log(result);
        }, function (error) {
            console.log(error); // Failure
        });


        return ppId


        // update user data
        // editUser(userId, {profilePictureId:ppId})
    },

    uploadFile: (bucketId, file) => {
        // create unique id
        const fileId = ID.unique()

        // upload to storage
        storage.createFile(
            bucketId,
            fileId,
            InputFile.fromBuffer(file.buffer, file.originalname)
        ).then(async (response) => {
            // console.log(response); // Success
        }, function (error) {
            console.log(error); // Failure
        });


        return {
            fileId:fileId,
            fileUrl:config.appwrite.endpoint + '/storage/buckets/' + bucketId + "/files/" + fileId + "/view?project=" + config.appwrite.projectId,
            bucketId:bucketId,
        }
    },

    getFileUrl: (bucketId, fileId) => {
        // const fileUrl = config.appwrite.endpoint + '/storage/files/' + fileId + '/view?project=' + config.appwrite.projectId;
        const fileUrl = config.appwrite.endpoint + '/storage/buckets/' + bucketId + "/files/" + fileId + "/view?project=" + config.appwrite.projectId;
        // https://cloud.appwrite.io/v1/storage/buckets/6662b819001eb37c9631/files/6662b9390003b8cbb1e3/view?project=663554e7000097ac14d7&mode=admin
        return fileUrl
    },

    logoutUser: async () => {
        console.log("logout user function");
    },

    // getCurrentUser: async () => {
    //     console.log("-------------------------get current user");
    //     let promise = await databases.listDocuments(
    //         config.appwrite.databaseId,
    //         config.appwrite.usersCollectionId,
    //         [
    //             Query.equal('username', '<USERNAME>')
    //         ]
    //     )
    //     .then((res) => {
    //         console.log(res);
    //     }, (err) => {
    //         console.log(err);
    //     })
    // },

    getUser: async (userId) => {
        // console.log("helloooo "+userID);

        // get user data
        return await databases.getDocument(
            config.appwrite.databaseId, // databaseId
            config.appwrite.usersCollectionId, // collectionId
            userId, // documentId
            [] // queries (optional)
        ).then((res) => {
            // console.log(res);
            return res
        }, (err) => {
            console.log(err);
        })
    },

    getUsers: async () => {
        const users = await databases.listDocuments(
            config.appwrite.databaseId, // databaseId
            config.appwrite.usersCollectionId, // collectionId
        )

        // console.log(users);

        return users

        // return ["abc", "def"]
    }
};

export default appwriteService;