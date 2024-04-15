import React from "react";
import { Text, Flex , Button, Box} from '@chakra-ui/react'
import BlackButton from "./black_button";
import { useNavigate } from 'react-router-dom';
import {useParams} from 'react-router-dom'
import { useCurStory } from "../contexts/CurrentStoryContext";

function StoryPageFooter(){
    const navigate = useNavigate();
    const pageData = useParams();
    const {bookInfo} = useCurStory()
    if (!bookInfo){
        navigate('/')
    }
    return(
        <Box marginY={'2.5rem'}>
            <Flex justifyContent={ 'space-around'}>
            <Button onClick={()=> { 
                 pageData.pageNumber == '1' ? navigate('/write')  : navigate(`/write/page/${parseInt(pageData.pageNumber) - 1 }`, {pageNumber : parseInt(pageData.pageNumber) - 1 })}} fontSize={'1rem'} color={'black'} variant={'outline'} width>Previous Page</Button>
            <BlackButton fontSize={'1rem'} >Next Page</BlackButton>
            </Flex>
            <Flex justifyContent={ 'space-around'}>
            <Button fontSize={'1rem'} color={'black'} variant={'outline'}>End Story</Button>
            </Flex>
            
        </Box>
    )
}
export default StoryPageFooter;
