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
    const [user, setUser] = useState<User | null>(null);

    return(
        <AuthContext.Provider value={{ user, setUser }}>
            { children }
        </AuthContext.Provider>
    );
};
