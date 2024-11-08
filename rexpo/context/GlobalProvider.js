import { createContext, useContext, useState , useEffect} from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return(
        <GlobalContext.Provider 
        value={{user, isLoading, isLoggedIn}}>
            {children}
        </GlobalContext.Provider>
    )
}
