import { createContext,useState,useEffect } from "react";


const DataContext = createContext({});

export const DataProvider = ({children}) => {
    const [loggedUser, setLoggedUser] = useState(() => {
        // Tenta carregar do localStorage na inicialização
        const savedUser = localStorage.getItem('loggedUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    //const [theme,setTheme] = useState('light');
    
   

    // Salva no localStorage sempre que loggedUser mudar
    useEffect(() => {
        if (loggedUser) {
            localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
           
        } else {
            localStorage.removeItem('loggedUser');
        }
    }, [loggedUser]);
   
   return (
    <DataContext.Provider value={{loggedUser, setLoggedUser,}}>
      {children}
    </DataContext.Provider>
)
}

export default DataContext;