import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { type User } from "../../types";
import { registeredUsers } from "../../constants/currentUser";
import { getLocalStorage, setLocalStorage } from "../../utils/storage";



export interface AuthContextProps {
    user: User | null,
    login: (name: string) => boolean;
    logout: () => void;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    login: () => false,
    logout: () => {},
    isAdmin: false,
})

export const useAuth = () => useContext(AuthContext)


export const AuthProvider = ({ children }: { children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(getLocalStorage('user'));
    const isAdmin = useMemo(() => user?.role === 'admin', [user])

    const login = (name: string) => {
        const newUser = registeredUsers.find(item => item.name === name)
        if(!newUser) {
            return false
        }

        setUser(newUser)
        setLocalStorage('user', newUser)
        return true;
    }

    const logout = () => {
        setUser(null);
        setLocalStorage('user', null)
    }


    return (
        <AuthContext.Provider
        value={{user, login, logout, isAdmin}}
        >
            {children}
        </AuthContext.Provider>
    )
}