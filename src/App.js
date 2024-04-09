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
import AppRouter from './routes/app-routes';
const App = () => {

  return (
    <Flex position={'relative'} flexDirection='column' height= '100vh' justifyContent={'center'}>
      <MainHeader />
        <Flex  justifyContent={'center'} position= 'absolute' top={'120px'} bottom={'40px'} padding='2.5rem 2.5rem 2.5rem 2.5rem' width={'100%'} margin={'0 auto'} height={'calc( 100vh - 280px'} mt={'120px'}>
       {/* <SlateEditor/> */}
        {/* < EditorWithImages /> */}
        {/* < CollaborativeEditor/> */}
        <Box width='658px' >
        <AppRouter />
        </Box>
        
     
        
    

    </Flex>
      
        
      <MainFooter/>

    </Flex>
    
   
  )
}

export default App;
