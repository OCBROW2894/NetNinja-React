import { Account, Client, ID, Avatars, Databases, Query } from 'react-native-appwrite';
import SignIn from '../app/(auth)/sign-in';

// Configuration object for Appwrite
export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',  // Appwrite API endpoint
    platform: 'com.ocbrow.aora',               // Platform identifier
    projectId: '672de793001a97a3092a',         // Project ID in Appwrite
    databaseId: '672deaeb00174bd22c3b',        // Database ID in Appwrite
    userCollectionId: '672deb3f001e1ad33764',  // User collection ID
    videoCollectionId: '672deba2002482045187', // Video collection ID
    storageId: '672defa40019caf73054'          // Storage ID
}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId
} = config;

// Initialize the Appwrite client
const client = new Client();

client
    .setEndpoint(config.endpoint) // Set the API endpoint
    .setProject(config.projectId) // Set the project ID
    .setPlatform(config.platform) // Set the platform ID

// Initialize Appwrite services
const account = new Account(client);  // Account service for user authentication
const avatars = new Avatars(client);  // Avatars service for user avatars
const databases = new Databases(client); // Databases service for data management

// Function to create a new user
export const createUser = async (email, password, username) => {
    try {
        // Create a new account with a unique ID
        const newAccount = await account.create(
            ID.unique(),  // Generate a unique ID for the user
            email,        // User's email
            password,     // User's password
            username      // User's username
        );

        if (!newAccount) throw Error;  // Throw an error if account creation fails

        // Get the user's avatar URL based on their initials
        const avatarUrl = avatars.getInitials(username);

        // Sign in the user immediately after account creation
        await signIn(email, password);

        // Create a new document in the user collection
        const newUser = await databases.createDocument(
            config.databaseId,       // Database ID
            config.userCollectionId, // Collection ID for users
            ID.unique(),             // Generate a unique ID for the document
            {
                accountId: newAccount.$id, // Store the account ID
                email,                     // Store the email
                username,                  // Store the username
                avatar: avatarUrl          // Store the avatar URL
            }
        );

        return newUser;  // Return the newly created user document
    } catch (error) {
        console.log(error);  // Log any errors
        throw new Error(error);  // Rethrow the error
    }
}

// Function to sign in a user
export const signIn = async (email, password) => {
    try {
        // Create a session using email and password
        const session = await account.createEmailPasswordSession(email, password);

        return session;  // Return the session object
    } catch (error) {
        throw new Error(error);  // Rethrow the error
    }
}

// Function to get the current user
export const getCurrentUser = async () => {
    try {
        // Retrieve the current account details
        const currentAccount = await account.get();

        if(!currentAccount) throw Error;  // Throw an error if no account is found

        // List documents in the user collection matching the current account ID
        const currentUser = await databases.listDocuments(
            config.databaseId,       // Database ID
            config.userCollectionId, // Collection ID for users
            [Query.equal('accountId', currentAccount.$id)] // Query to match account ID
        );

        if(!currentUser) throw Error;  // Throw an error if no user document is found

        return currentUser.documents[0];  // Return the first matching user document
    } catch (error) {
        console.log(error);  // Log any errors
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
        );

        return posts.documents;
        } catch (error) {
            throw new Error(error);
        }
    }

    export const getLatestPosts = async () => {
        try {
            const posts = await databases.listDocuments(
                databaseId,
                videoCollectionId,
                [Query.orderDesc('$createdAt', Query.limit(8))],
            );
    
            return posts.documents;
            } catch (error) {
                throw new Error(error);
            }
        }