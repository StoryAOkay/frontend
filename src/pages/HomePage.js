import React from "react";
import { useNavigate } from "react-router-dom";
import {Box, Heading, Flex, Button} from '@chakra-ui/react';
import BlackButton from "../components/black_button";
import { useAuth } from "../contexts/AuthContext";

function HomePage(){
    const navigate = useNavigate();
    let auth = useAuth();
    if (!auth){
        return(<></>)
    }
    const name = auth.user.name
 
    return(
        <Box>

        <Flex
            py="5rem"
            flexDirection={"column"}
            alignItems="center"
        >
            <Box width={'280px'} textAlign={'left'}>
                <Heading as='h2' fontSize='54px' pb='3rem' fontFamily={'Mountains of Christmas'}>{`Welcome ${name} !`}</Heading>                
                
                
                <BlackButton
                    marginBottom="8px"
                    borderRadius="20px"
                    height="60px"
                    width="240px"
                    color="#fff"
                    background={"#3182CE"}
                    fontSize="24px"
                    marginTop={"2rem"}
                    onClick={()=> navigate('/write')}
                >
                  CREATE STORY
                </BlackButton>
                <Button
                    marginBottom="8px"
                    borderRadius="20px"
                    height="60px"
                    width="240px"
                    fontSize="24px"
                    marginTop={"2rem"}
                    onClick={()=> navigate('/mystories')}
                    background='#fff'
                    color='black'
                    variant={'outline'}
                >
                  MY STORIES
                </Button>
                <Button
                    marginBottom="8px"
                    borderRadius="20px"
                    height="60px"
                    width="240px"
                    color="black"
                    background={"#fff"}
                    fontSize="24px"
                    marginTop={"2rem"}
                    onClick={()=> navigate('/editors')}
                    variant={'outline'}
                >
                 EDITOR'S PICK
                </Button>
               
            </Box>

        </Flex>
    </Box>
    )
}
export default HomePage;