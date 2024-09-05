import { useState, useEffect } from "react";

export const useAuthHook = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Your authentication logic here
    // Perform any necessary authentication checks and set isAuthenticated accordingly
    // For example, check if the user is logged in or has valid credentials
    // Update setIsAuthenticated with the result
    const token = localStorage.getItem("user");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return isAuthenticated;
};

export default useAuthHook;
