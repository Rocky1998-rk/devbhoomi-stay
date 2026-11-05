import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("devbhoomi_owner_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback default demo owner
      }
    }
    return {
      _id: "owner-rocky-101",
      name: "Rocky Kumar",
      email: "rocky@pineretreat.com",
      role: "owner",
      hotel: {
        _id: "hotel-pine-retreat",
        name: "The Pine Retreat",
        city: "Lansdowne",
        state: "Uttarakhand",
        status: "Active",
        image: "/Boutique_hotel_in_Uttarakhand_Hi._2K_20261003012235.jpg",
      },
    };
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("devbhoomi_owner_token") || "demo-owner-jwt-token";
  });

  const [selectedHotel, setSelectedHotel] = useState({
    id: "hotel-pine-retreat",
    name: "The Pine Retreat",
    location: "Lansdowne, Uttarakhand",
    status: "Active",
    image: "/Boutique_hotel_in_Uttarakhand_Hi._2K_20261003012235.jpg",
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("devbhoomi_owner_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("devbhoomi_owner_user");
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("devbhoomi_owner_token", token);
    } else {
      localStorage.removeItem("devbhoomi_owner_token");
    }
  }, [token]);

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        login,
        logout,
        selectedHotel,
        setSelectedHotel,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;

