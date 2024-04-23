import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import EditorPickPage from "../pages/EditorPage";
import MyStoriesPage from "../pages/MyStoriesPage";
import StoryPage, { StoryPageEditor } from "../pages/StoryPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import { RequireAuth } from "../contexts/AuthContext";
import StoryReader from "../reader/StoryReader";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" end element={<RequireAuth><HomePage /></RequireAuth>} />
      <Route path="/write" end element={<RequireAuth><StoryPage /></RequireAuth>} >
          <Route path='/write/page/:pageNumber' end element={<RequireAuth><StoryPageEditor/></RequireAuth>} />      
      </Route>
      <Route path="/editors" end element={<RequireAuth><EditorPickPage /></RequireAuth>} />
      <Route path="/read" end element={<RequireAuth><StoryReader/></RequireAuth>} ></Route>
      <Route path="/mystories" end element={<RequireAuth><MyStoriesPage /></RequireAuth>} />
      <Route path="/login" end element={<LoginPage />} />
      <Route path="/signup" end element={<SignupPage />} />     
   
    </Routes>
  );
}