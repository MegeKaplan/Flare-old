const { Client } = require("appwrite")
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('663554e7000097ac14d7');



module.exports = client