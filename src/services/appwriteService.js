// appwriteService.js

import { Client, Databases, ID, Permission, Role, Account, Query } from "node-appwrite";
import config from '../config.js';


const client = new Client();
client
    .setEndpoint(config.appwrite.endpoint)
    .setProject(config.appwrite.projectId)
    .setKey(config.appwrite.apiKey)
    .setSelfSigned(true)


const databases = new Databases(client);

const account = new Account(client);

const appwriteService = {
    // create user
    createUser: async (userdata) => {
        var auth = false

        // create account
        const userId = ID.unique()
        const promise = await account.create(userId, userdata.email, userdata.password, userdata.username)
        .then(function (response) {
            console.log(response);
            auth = true
        }, function (error) {
            console.log(error);
            auth = false
        });

        if(auth){
            try {
                const promise = databases.createDocument(
                    '663a7a740033428b683c',
                    '663a7a7e00154237915a',
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
                console.log(res);
                return res
            }, (err) => {
                console.log(err);
            })
            
        }, function (error) {
            console.log(error); // Failure
        });
        return "ghelo"
    },

    logoutUser: async (userdata) => {
        console.log("logout user function");
    },

    getCurrentUser: async () => {
        console.log("-------------------------get current user");
        let promise = await databases.listDocuments(
            config.appwrite.databaseId,
            config.appwrite.usersCollectionId,
            [
                Query.equal('username', '<USERNAME>')
            ]
        )
        .then((res) => {
            console.log(res);
        }, (err) => {
            console.log(err);
        })
    },

    getUser: async (userID) => {
        console.log("helloooo "+userID);

        // get user data
        return await databases.getDocument(
            config.appwrite.databaseId, // databaseId
            config.appwrite.usersCollectionId, // collectionId
            userID, // documentId
            [] // queries (optional)
        ).then((res) => {
            console.log(res);
            return res
        }, (err) => {
            console.log(err);
        })
    }
};

export default appwriteService;