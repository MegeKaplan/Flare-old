// appwriteService.js

import { Appwrite } from 'appwrite';
import config from '../config.js';

const appwrite = new Appwrite();
appwrite
    .setEndpoint(config.appwrite.endpoint)
    .setProject(config.appwrite.projectId)
    // .setKey(config.appwrite.apiKey);

const database = appwrite.database;

const appwriteService = {
    // create user
    createUser: async (email, password, name) => {
        try {
            const result = await database.createDocument(
                config.appwrite.databaseId,
                { email, password, name }
            );
            return result;
        } catch (error) {
            throw new Error(`Kullanıcı eklenirken bir hata oluştu: ${error.message}`);
        }
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