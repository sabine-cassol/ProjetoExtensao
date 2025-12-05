import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({children}){
    const [user, setUser] = useState(null);
    const [role, setRole] = useState("guest");

    const login = (userData) =>{
        setUser(userData);
        setRole(userData.role);
    }

    const logout = () =>{
        setUser(null);
        setRole("guest"); 
    }

    return(
        <UserContext.Provider value={{ user,role,login,logout }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser(){
    return useContext(UserContext);
}