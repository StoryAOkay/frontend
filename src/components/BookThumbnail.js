import React from "react";
import { Flex, Box, Image, Text, HStack, Popover, PopoverHeader, PopoverBody, PopoverTrigger, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverFooter, ButtonGroup, Button, FocusLock, useDisclosure } from '@chakra-ui/react';
import BlackButton from "./black_button";
import { useCurStory } from "../contexts/CurrentStoryContext";
import { useNavigate , useParams} from 'react-router-dom';

export default function BookThumbnail({ books, canWrite }) {
    const {setCurBookInfo, pages, bookInfo} = useCurStory()
    const navigate = useNavigate()
    const editBook = (event,book)=>{
        event.preventDefault()
        const page_num = pages.length + 1
        setCurBookInfo(book)
        navigate(`/write/page/${page_num}`, {pageNumber: page_num})
        
    }
    return (
        <Flex>

            {books.map(
                (book) => {
                    return (


                        <Popover key={book._id} maxW='180px' >
                            <PopoverTrigger>
                                <Box border='1px solid black' borderRadius='30px' padding='1.25rem'>
                                    <Image src={book.image} height='165px' borderRadius={'40px'} />
                                    <Text>{book.title}</Text>
                                </Box>
                            </PopoverTrigger>
                            <PopoverContent padding={'1rem'}>
                                <PopoverArrow />
                                <PopoverHeader>
                                    <Text fontWeight={600}>{book.title}</Text></PopoverHeader>
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
