import React, { useEffect } from "react";
import {Box, Text, Image} from '@chakra-ui/react';
import { useMyBooks } from "../contexts/MyBooksContext";
import BookThumbnail from "../components/BookThumbnail";
function EditorPickPage(){
    const {myBooks, getMyBooks} = useMyBooks()
    useEffect(()=>{
        getMyBooks()
    },[])
    return(
        
        <Box minWidth='720px' width='900px'>
            
            <BookThumbnail books={myBooks.slice(0, 1)} canWrite={false} />
        </Box>
    )
}
export default EditorPickPage;