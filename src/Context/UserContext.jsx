import {createContext, useState} from "react";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState();

    return <UserContext.Provider value={{ userId, setUserId }}>
        {children}
    </UserContext.Provider>
}

export default UserProvider;