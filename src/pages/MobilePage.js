import React from "react";
import {
    Box,
    Text,
    Heading
} from "@chakra-ui/react";
import {Outlet, useParams} from 'react-router-dom'
import MainHeader from "../components/MainHeader";
import MainFooter from "../components/MainFooter";
import useMediaQuery from "../hooks/useMediaQuery";
function SmallScreen() {
    
    return (
        <Box>
            <MainHeader />
            <Heading as='h2' color='#662e9b' fontSize='54px' pb='3rem' fontFamily={'Mountains of Christmas'}>StoryNasi</Heading>                
                
            <Text fontWeight={'bold'} fontSize={'24px'}> Coming soon!!!!
            </Text>
            <MainFooter />
        </Box>
    )
}

  
  export default SmallScreen;