import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "../axios";

let AuthContext = React.createContext(null);

const base_url = "http://localhost:5000/api";

export function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);
  const setCurrentUser = (userDTO) => {
    if (!userDTO) {
      setUser(null);
      return;
    }

    setUser({
      ...userDTO,
      name: `${userDTO.name}`,
      age: `${userDTO.age}`,
      email: `${userDTO.email}`,
      id: `${userDTO.id}`,
    });
  };
  const value = React.useMemo(() => {
    const getUserProfile = async () => {

      await axios()
        .get(`${base_url}/users/`)
        .then((res) => {
          setCurrentUser({
            ...res.data,
            name: res.data.name,
            email: res.data.email,
            id: res.data.id,
            age: res.data.age,
          });
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    };

    return {
      user,
      getUserProfile,
      setCurrentUser,
    };
  }, [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  return React.useContext(AuthContext);
}
export function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();
  if (sessionStorage.getItem("token")) {
    auth.getUserProfile();
  }
  if (auth.user || sessionStorage.getItem("token")) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
}