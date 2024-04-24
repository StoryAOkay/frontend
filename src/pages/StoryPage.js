import React from "react";
import { Box } from '@chakra-ui/react'
import EditorWithImages from "../Editor/ImageEditor";
import StoryPageFooter from "../components/story_page_footer";
import StoryForm from "../components/StoryForm";
import {Outlet, useParams} from 'react-router-dom'
import { useCurStory } from "../contexts/CurrentStoryContext";


function StoryPage(){
    const pageData = useParams()
    const { bookInfo, getAllPages  } =useCurStory()

    React.useEffect(()=>{
        if (bookInfo){
            getAllPages(bookInfo.id)
        }
            
    },[bookInfo, getAllPages])
    return (
        <Box width='658px' >
           { pageData && Object.keys(pageData).length === 0  || pageData.pageNumber === '0'? <StoryForm />  :  <Outlet /> }
        </Box>
        
    )
}
export function StoryPageEditor(){
    
    
    return(
        <Box>
            < EditorWithImages /> 
              <StoryPageFooter />
        </Box>
    )
}
export default StoryPage;