import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import EditorPickPage from "../pages/EditorPage";
import MyStoriesPage from "../pages/MyStoriesPage";
import StoryPage from "../pages/StoryPage";

export default function AppRouter() {
  return (
    <Routes>
        <Route path="/" end element={<HomePage />} />
      <Route path="/create" end element={<StoryPage />} />
      <Route path="/editors" end element={<EditorPickPage />} />
      <Route path="/mystories" end element={<MyStoriesPage />} />
      
    </Routes>
  );
}