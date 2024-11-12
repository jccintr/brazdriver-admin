import { createContext,useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({children}) => {
    const [loggedUser,setLoggedUser] = useState(null);
    //const [theme,setTheme] = useState('light');
   
   
   return (
    <DataContext.Provider value={{loggedUser, setLoggedUser,}}>
      {children}
    </DataContext.Provider>
)
}

export default DataContext;