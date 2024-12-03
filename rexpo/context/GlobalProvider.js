// Import necessary hooks from React and custom authentication function
import { createContext, useContext, useState , useEffect} from "react";
import { getCurrentUser } from "../lib/appwrite";

// Create a new context to share global state across components
const GlobalContext = createContext();

// Custom hook to easily access the global context anywhere in the app
export const useGlobalContext = () => useContext(GlobalContext);

// GlobalProvider component that wraps the app to provide global state
const GlobalProvider = ({children}) => {
    // State for storing the current user's data
    const [user, setUser] = useState(null);
    // State for tracking loading states across the app
    const [isLoading, setIsLoading] = useState(true);
    // State for tracking user's authentication status
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Effect runs once when component mounts to check authentication status
    useEffect(() => {
        // Call Appwrite service to get current user's session
        getCurrentUser()
        .then((res) => {
            if(res) {
                // If user session exists, update login status and user data
                setIsLoggedIn(true);
                setUser(res);
            } else {
                // If no session, ensure user is marked as logged out
                setIsLoggedIn(false);
                setUser(null);
            }
        })
        .catch((error) => {
            // Log any authentication errors
            console.log(error);
        })
        .finally(() => 
            // Always set loading to false when auth check completes
            setIsLoading(false));
    }, []); // Empty dependency array means this runs once on mount

    // Provide global state and setter functions to all child components
    return(
        <GlobalContext.Provider 
        value={{
            user,           // Current user data
            setUser,        // Function to update user data
            isLoading,      // Loading state
            isLoggedIn,     // Authentication state
            setIsLoggedIn,  // Function to update auth state
            }}>
            {children}
        </GlobalContext.Provider>
    )
}

// Export the provider component for use in app root
export default GlobalProvider;
