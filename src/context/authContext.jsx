import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [token, setToken] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
    setIsLoaded(true);
  }, []);

  const login = (user) => {
    setUser(user);
    setToken(user.accessToken);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", user.accessToken);
  };

  const logout = () => {
    setUser(undefined);
    setToken(undefined);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const updateAvatar = (avatarUrl) => {
    const updatedUser = {
      ...user,
      avatarUrl: avatarUrl,
    };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{ user, updateAvatar, token, isLoaded, login, logout }}
    >
      {isLoaded ? children : null}
    </AuthContext.Provider>
  );
};
