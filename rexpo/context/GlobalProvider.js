import { createContext, useContext, useState , useEffect} from "react";
import { getCurrentUser } from "../lib/appwrite";
const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        getCurrentUser
        .then((res) => {
            if(res) {
                setIsLoggedIn(true);
                setUser(res);
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => 
            setIsLoading(false));
    }, []);

    return(
        <GlobalContext.Provider 
        value={{
            user,
            setUser,
            isLoading,
            isLoggedIn,
            setIsLoggedIn,
            }}>
            {children}
        </GlobalContext.Provider>
    )
}
