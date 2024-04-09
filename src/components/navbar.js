
import React from "react";
import { NavLink } from "react-router-dom";
import {Flex} from '@chakra-ui/react'
export default function Navbar() {

  
  return (
        <Flex justifyContent='space-around' className="nav justify-content-end" width='100%'>
          <li className="nav-item">
            <span className="nav-link">
              <NavLink to="/"> HOME </NavLink>
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-link">
              <NavLink to="/create"> CREATE STORY</NavLink>
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-link">
              <NavLink to="/mystories">MY STORIES </NavLink>
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-link">
              <NavLink to="/editors">EDITOR'S PICK </NavLink>
            </span>
          </li>

          <li className="nav-item">
            <span className="nav-link">
            <NavLink to="/">LOGOUT </NavLink>
            </span>
          </li>
        </Flex>

  );
}