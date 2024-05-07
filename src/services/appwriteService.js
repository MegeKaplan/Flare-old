// appwriteService.js

import { Client, Databases, ID, Permission, Role } from "appwrite";// appwrite modülünü içe aktar
import config from '../config.js';


const client = new Client(); // Appwrite istemcisini oluştur
client
    .setEndpoint(config.appwrite.endpoint)
    .setProject(config.appwrite.projectId)
    // .setKey(config.appwrite.apiKey);


const databases = new Databases(client);


const appwriteService = {
    // create user
    createUser: async (userdata) => {
        try {
            const promise = databases.createDocument(
                '663a7a740033428b683c',
                '663a7a7e00154237915a',
                ID.unique(), 
                userdata)
            return promise;
        } catch (error) {
            throw new Error(`Kullanıcı eklenirken bir hata oluştu: ${error.message}`);
        }
    },
};

export default appwriteService;