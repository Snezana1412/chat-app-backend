import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  user: {},
  login: () => {},
  logout: () => {},
});

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

  const [user, setUser] = useState(null);

  const [token, setToken] = useState(null);

  let isAuthenticated = false;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));

      isAuthenticated = true;
    }
  }, []);

  const login = (userData) => {
    console.log("🚀 ~ login ~ userData:", userData);
    setToken(userData);
    setUser(userData);
    isAuthenticated = true;
    localStorage.setItem("user", JSON.stringify(userData));
    // asign context user value
  };

  console.log(user, isAuthenticated, token);

  const logout = () => {
    setToken(null);

    localStorage.removeItem("user");
  };
  if (localStorage.getItem("user")) {
    isAuthenticated = true;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
