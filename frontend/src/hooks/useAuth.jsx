import { useContext } from "react";
import { AuthContext, useUserContext } from "../context/AuthProvider";

export const useAuth = () => {
  const context = useUserContext();
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default useAuth;
