// appwriteService.js

import { Appwrite, Account } from 'appwrite';
import config from '../config.js';

const client = new Appwrite();
client
    .setEndpoint(config.appwrite.endpoint)
    .setProject(config.appwrite.projectId)
    // .setKey(config.appwrite.apiKey);

const database = client.database;

const account = new Account(client);

const appwriteService = {
    // create user
    createUser: async (userdata) => {
        auth=false


        // create account
        var promise = account.create('[USER_ID]', 'email@example.com', '');

        promise.then(function (response) {
            console.log(response);
        }, function (error) {
            console.log(error);
        });

        // send verify email
        // var promise = account.createVerification('localhost/verify');

        // promise.then(function (response) {
        //     console.log(response);
        // }, function (error) {
        //     console.log(error);
        // });



        // write database
        if(auth){
            try {
                const result = await database.createDocument(
                    config.appwrite.databaseId,
                    userdata
                );
                return result;
            } catch (error) {
                throw new Error(`An error occurred: ${error.message}`);
            }
        }

    },

    verifyAccount: async (userdata) => {
        const session = await account.createSession(
            userId,
            '[SECRET]'
        );
    },

    // Kullanıcı güncelleme
    updateUser: async (userId, email, name) => {
        try {
            const result = await database.updateDocument(
                config.appwrite.databaseId,
                userId,
                { email, name }
            );
            return result;
        } catch (error) {
            throw new Error(`Kullanıcı güncellenirken bir hata oluştu: ${error.message}`);
        }
    },

    // Kullanıcı silme
    deleteUser: async (userId) => {
        try {
            const result = await database.deleteDocument(
                config.appwrite.databaseId,
                userId
            );
            return result;
        } catch (error) {
            throw new Error(`Kullanıcı silinirken bir hata oluştu: ${error.message}`);
        }
    },

    // Kullanıcı listeleme
    listUsers: async () => {
        try {
            const result = await database.listDocuments(config.appwrite.databaseId);
            return result.documents;
        } catch (error) {
            throw new Error(`Kullanıcılar listelenirken bir hata oluştu: ${error.message}`);
        }
    }
};

export default appwriteService;