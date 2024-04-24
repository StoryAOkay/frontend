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
import useMediaQuery from "../hooks/useMediaQuery";
import SmallScreen from "../pages/MobilePage";

export default function AppRouter() {
  const isSmallScreen = useMediaQuery();
  return (
    <Routes>
      
      <Route path="/" end element={<RequireAuth>{ isSmallScreen ? <SmallScreen /> : <HomePage />}</RequireAuth>} />
      <Route path="/write" end element={<RequireAuth>{ isSmallScreen ? <SmallScreen /> : <StoryPage />}</RequireAuth>} >
          <Route path='/write/page/:pageNumber' end element={<RequireAuth>{ isSmallScreen ? <SmallScreen /> :<StoryPageEditor/>}</RequireAuth>} />      
      </Route>
      <Route path="/editors" end element={<RequireAuth>{ isSmallScreen ? <SmallScreen /> : <EditorPickPage />}</RequireAuth>} />
      <Route path="/read" end element={<RequireAuth>{ isSmallScreen ? <SmallScreen /> :<StoryReader/>}</RequireAuth>} ></Route>
      <Route path="/mystories" end element={<RequireAuth>{ isSmallScreen ? <SmallScreen /> :<MyStoriesPage />}</RequireAuth>} />
      <Route path="/login" end element={isSmallScreen ? <SmallScreen /> :<LoginPage />} />
      <Route path="/signup" end element={ isSmallScreen ? <SmallScreen /> : <SignupPage />} />     
   
    </Routes>
  );
}