import React from "react";
import { Box } from '@chakra-ui/react'
import EditorWithImages from "../Editor/ImageEditor";
import StoryPageFooter from "../components/story_page_footer";

function StoryPage(){
    return (
        <Box >
             < EditorWithImages />
             <StoryPageFooter />
        </Box>
        
    )
}
export default StoryPage;