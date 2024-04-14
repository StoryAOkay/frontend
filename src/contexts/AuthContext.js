import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "../axios";

let AuthContext = React.createContext(null);

const base_url = process.env.REACT_APP_BASE_URL;

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
  const getUserProfile = React.useCallback(async()=>{

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
  }, [])
  
  const value = React.useMemo(() => ({
    user,
    getUserProfile,
    setCurrentUser
  }), [user, getUserProfile, setCurrentUser]);
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  return React.useContext(AuthContext);
}
export function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();
  if (sessionStorage.getItem("token") && !auth.user)  {
    auth.getUserProfile();
  }
  if (auth.user || sessionStorage.getItem("token")) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
}