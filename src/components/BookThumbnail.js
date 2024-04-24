import React, { useState } from "react";
import { Flex, Box, Image, Text, HStack, Popover, PopoverHeader, PopoverBody, PopoverTrigger, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverFooter, ButtonGroup, Button, FocusLock, useDisclosure } from '@chakra-ui/react';
import BlackButton from "./black_button";
import { useCurStory } from "../contexts/CurrentStoryContext";
import { useNavigate , useParams} from 'react-router-dom';

export default function BookThumbnail({ books, canWrite }) {
    const {setCurBookInfo} = useCurStory()
    const navigate = useNavigate()
    const editBook = (event,book)=>{
        event.preventDefault()
        setCurBookInfo(book)
        navigate(`/write`)
        
    }
    return (
        <Flex _after={{
            content: '""',
            flex: "auto",
          }} justifyContent={'space-around'} flexWrap={'wrap'} >

            {books.map(
                (book) => {      
                    return (


                        <Popover key={book._id} maxW='220px' >
                            <PopoverTrigger>
                                <Box border='1px solid black' borderRadius='30px' padding='1.25rem' width='240px' mb={'2rem'} marginRight={'2rem'}>
                                    <Image src={book.image} height='165px' borderRadius={'40px'} style={{'margin': 'auto'}}/>
                                    <Text fontWeight={600} textTransform={'uppercase'} mt='0.5rem'>{book.title}</Text>
                                </Box>
                            </PopoverTrigger>
                            <PopoverContent padding={'1rem'}>
                                <PopoverArrow />
                                <PopoverHeader>
                                    <Text fontWeight={600} textTransform={'uppercase'}>{book.title}</Text></PopoverHeader>
                                <PopoverCloseButton size='lg' />
                                <PopoverBody>
                                    <Flex ><Text fontWeight={600} mr='0.5rem'>Description: </Text> <Text>{book.description}</Text></Flex>
                                    <Flex ><Text fontWeight={600} mr='0.5rem'>Author: </Text> <Text>{book.author_name}</Text></Flex>

                                    <Flex ><Text fontWeight={600} mr='0.5rem'>Author's age: </Text> <Text>{book.author_age}</Text></Flex>
                                </PopoverBody>
                                <PopoverFooter
                                    border='0'
                                    display='flex'
                                    
                                    flexDirection={'column'}
                                    pb={4}
                                >
                                    <BlackButton
                                        marginBottom="16px"
                                        borderRadius="10px"
                                        height="48px"
                                        width="100%"
                                        fontWeight={'normal'}
                                        fontSize="20px"
                                        onClick={()=> navigate('/read')}
                                    >
                                        Read
                                    </BlackButton>

                                    { canWrite &&
                                    <Button width='100%' onClick={(event)=>editBook(event, book) }>
                                        Edit
                                    </Button>}

                                </PopoverFooter>
                            </PopoverContent>
                        </Popover>

                    )
                }
            )}

        </Flex>
    )
}
