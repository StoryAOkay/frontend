import React from "react";
import { Box } from '@chakra-ui/react'
import EditorWithImages from "../Editor/ImageEditor";
import StoryPageFooter from "../components/story_page_footer";
import StoryForm from "../components/StoryForm";
import {Outlet, useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useCurStory } from "../contexts/CurrentStoryContext";

function StoryPage(){
    const pageData = useParams()
    const {setCurBookInfo, bookInfo} =useCurStory()
    return (
        <Box >
           { Object.keys(pageData).length === 0  || pageData.pageNumber === '0'? <StoryForm />  :  <Outlet /> }
        </Box>
        
    )
}
export function StoryPageEditor(){
    
    return(
        <>
            < EditorWithImages /> 
              <StoryPageFooter />
        </>
    )
}
export default StoryPage;