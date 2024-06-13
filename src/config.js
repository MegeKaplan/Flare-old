import "dotenv/config"

const config = {
    appwrite: {
        endpoint: process.env.ENDPOINT,
        projectId: process.env.PROJECT_ID,
        apiKey: process.env.API_KEY,
        databaseId: process.env.DATABASE_ID,
        usersCollectionId: process.env.USERS_COLLECTION_ID,
        postsCollectionId: process.env.POSTS_COLLECTION_ID,
        profilePhotosBucket: process.env.PROFILE_PHOTOS_BUCKET,
        postPhotosBucket: process.env.POST_PHOTOS_BUCKET,
    },
    session: {
        secret: "helloworld",
    },
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 100
    }
};

export default config