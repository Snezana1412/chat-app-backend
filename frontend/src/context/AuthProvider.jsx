import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  user: {},
  login: () => {},
  logout: () => {},
});

export const useUserContext = () => {
  return useContext(AuthContext);
};

// Create a context with default values
// export const AuthContext = createContext({
//   isAuthenticated: false,
//   user: null,
//   login: () => {},
//   logout: () => {},
// });

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   // Check if user is already authenticated (e.g., from a cookie or local storage)
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //     setIsAuthenticated(true);
  //   }
  // }, []);

  // const login = (userData) => {
  //   // Simulate login API call
  //   setUser(userData);
  //   setIsAuthenticated(true);
  //   localStorage.setItem("user", JSON.stringify(userData));
  // };

  // const logout = () => {
  //   // Simulate logout API call
  //   setUser(null);
  //   setIsAuthenticated(false);
  //   localStorage.removeItem("user");
  // };

  // return (
  //   <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
  //     {children}
  //   </AuthContext.Provider>
  // );

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));

      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
    // asign context user value
  };

  const logout = () => {
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
