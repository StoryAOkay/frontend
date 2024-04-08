// import logo from './logo.svg';
import './App.css';

import React from 'react'
import SlateEditor from './Editor/SlateEditor';
import EditorWithImages from './Editor/ImageEditor';
import CollaborativeEditor from './Editor/CollabEditor';
import StoryPage from './pages/StoryPage';
import { Flex, Box } from '@chakra-ui/react'
import MainFooter from './components/MainFooter';
import MainHeader from './components/MainHeader';
const App = () => {

  return (
    <Box>
      <MainHeader />
        <Box padding='2.5rem 2.5rem 0rem 2.5rem'  width={'680px'} margin={'0 auto'} height={'calc( 100vh - 280px'}>
       {/* <SlateEditor/> */}
        {/* < EditorWithImages /> */}
        {/* < CollaborativeEditor/> */}
        
     
        <StoryPage />
    

    </Box>
      
        
      <MainFooter/>

    </Box>
    
   
  )
}

export default App;
