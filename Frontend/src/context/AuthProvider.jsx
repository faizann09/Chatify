import { createContext, useState, useContext } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const cookieUser = Cookies.get("jwt");
    const localUser = localStorage.getItem("messenger");

    let parsedUser;
    try {
        parsedUser = cookieUser ? JSON.parse(cookieUser) : localUser ? JSON.parse(localUser) : undefined;
    } catch (error) {
        parsedUser = undefined;
    }

    const [authUser, setAuthUser] = useState(parsedUser);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

