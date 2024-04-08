// import logo from './logo.svg';
import './App.css';

import React from 'react'
import SlateEditor from './Editor/SlateEditor';
import EditorWithImages from './Editor/ImageEditor';
import CollaborativeEditor from './Editor/CollabEditor';
import StoryPage from './pages/StoryPage';
import { Flex, Box } from '@chakra-ui/react'
const App = () => {

  return (
    <Box paddingX='2.5rem'  width={'768px'} margin={'16px auto'} border='2px solid red'>
       {/* <SlateEditor/> */}
        {/* < EditorWithImages /> */}
        {/* < CollaborativeEditor/> */}
        
     
        <StoryPage />
    

        
        
    </Box>
   
  )
}

export default App;
