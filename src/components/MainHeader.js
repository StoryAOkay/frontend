import React from "react";
import {Flex } from '@chakra-ui/react';
import Navbar from "./navbar";

function MainHeader(){
    return(<Flex width={'100%'} height={'120px'} background={'#662e9b'} position={'fixed'} top={0} alignItems={'center'}>
            <Navbar />
    </Flex>)
}
export default MainHeader