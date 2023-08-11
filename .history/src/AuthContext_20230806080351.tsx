import { createContext, useState } from 'react';

export const AuthContext = createContext<{
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({ user: null, setUser:() => {} });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);

    return(
        <AuthContext.Provider value={{ user, setUser }}>
            { children }
        </AuthContext.Provider>
    );
};
