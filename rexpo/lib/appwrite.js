import { Account, Client, ID } from 'react-native-appwrite';
import { Avatars } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.ocbrow.aora',
    projectId: '672de793001a97a3092a',
    databaseId: '672deaeb00174bd22c3b',
    userCollectionId: '672deb3f001e1ad33764',
    videoCollectionId: '672deba2002482045187',
    storageId: '672defa40019caf73054'
}


// Init your React Native SDK
const client = new Client();
const avatars = new Avatars(client);

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.


const account = new Account(client);


export const createUser = async (email, password, username) => {
    try {
       const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
       )

       if(!newAccount) throw Error;

       const avatarUrl = avatars.getInitials(username);
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

