import { createContext, useContext, useState } from "react";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { useEffect } from "react";

// Context Create
const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {

    
  // Logged-in User
  const [user, setUser] = useState(null);

  // JWT Token
  const [token, setToken] = useState(null);

  // Loading State
 const [loading, setLoading] = useState(true);

useEffect(() => {
  const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
  const savedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);

  console.log("Saved User:", savedUser);
  console.log("Saved Token:", savedToken);

  if (savedUser && savedToken) {
    setUser(JSON.parse(savedUser));
    setToken(savedToken);
  }

  setLoading(false);
}, []);

  //=========Login Function (Backend ke baad update karenge)==========================
 const login = (userData, userToken) => {
  setUser(userData);
  setToken(userToken);

  localStorage.setItem(
    STORAGE_KEYS.USER,
    JSON.stringify(userData)
  );

  localStorage.setItem(
    STORAGE_KEYS.TOKEN,
    userToken
  );
};



  //======================== Logout Function======================
 const logout = () => {
  setUser(null);
  setToken(null);

  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
};

  // Authentication Status
  const isAuthenticated = !!token;


  
  return (
    <AuthContext.Provider
      value={{user,token,loading,isAuthenticated,login,logout,setLoading,}}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => {
  return useContext(AuthContext);
};