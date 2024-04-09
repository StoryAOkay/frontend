import React from "react";
import {Flex } from '@chakra-ui/react';
import Navbar from "./navbar";

function MainHeader(){
    return(<Flex width={'90%'} height={'120px'} background={'black'} position={'fixed'} top={0} alignItems={'center'}>
            <Navbar />
    </Flex>)
}
export default MainHeader