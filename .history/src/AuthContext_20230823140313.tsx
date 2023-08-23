import { useEffect } from "react";
import { User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { createContext, useState, Dispatch, SetStateAction  } from 'react';

type AuthContextType = {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
};

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {}
});
  

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        if(user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    return(
        <AuthContext.Provider value={{ user, setUser }}>
            { children }
        </AuthContext.Provider>
    );
};
