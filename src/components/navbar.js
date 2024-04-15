
import React from "react";
import { NavLink } from "react-router-dom";
import {Flex} from '@chakra-ui/react'
import { useAuth } from "../contexts/AuthContext";
import { useCurStory } from "../contexts/CurrentStoryContext";

export default function Navbar() {
  const [isLoading, setIsLoading] = React.useState(false);
  const {setCurStoryNull} = useCurStory()
  let auth = useAuth();
  const logout = () => {
    if (auth && auth.user && sessionStorage.hasOwnProperty("token")) {
      setIsLoading(true);
      sessionStorage.clear();
      auth.setCurrentUser(null);
      window.location.reload();
      setIsLoading(false);
    }
  };
  if ( !auth || !auth.user ){
    return(
      <span></span>
    )
  }
  
  return (
        <Flex justifyContent='space-around' className="nav justify-content-end" width='100%'>
          <li className="nav-item">
            <span className="nav-link">
              <NavLink to="/"> HOME </NavLink>
            </span>
          </li>
          <li className="nav-item" onClick={setCurStoryNull}>
            <span className="nav-link">
              <NavLink end to="/write"> CREATE STORY</NavLink>
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-link">
              <NavLink end to="/mystories">MY STORIES </NavLink>
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-link">
              <NavLink end to="/editors">EDITOR'S PICK </NavLink>
            </span>
          </li>

          <li className="nav-item">
            <span className="nav-link" onClick={logout}>
            <NavLink end to="/login">LOGOUT </NavLink>
            </span>
          </li>
        </Flex>

  );
}