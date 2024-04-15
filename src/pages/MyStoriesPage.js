import React, { useEffect } from "react";
import {Box, Text, Image} from '@chakra-ui/react';
import { useMyBooks } from "../contexts/MyBooksContext";
import BookThumbnail from "../components/BookThumbnail";

function MyStoriesPage(){
    const {myBooks, getMyBooks} = useMyBooks()
    useEffect(()=>{
        getMyBooks()
    },[])
    return(
        
        <Box border='2px solid red'>
            
            <BookThumbnail books={myBooks} canWrite={true} />
        </Box>
    )
}
export default MyStoriesPage;