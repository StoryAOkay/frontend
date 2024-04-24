import React from "react";
import { Text, Flex, Button, Box, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay } from '@chakra-ui/react'
import BlackButton from "./black_button";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { useCurStory } from "../contexts/CurrentStoryContext";

function StoryPageFooter() {
    const navigate = useNavigate();
    const pageData = useParams();
    const { bookInfo, createPage, updatePage, content, setContent, setPageContent, editor, pages } = useCurStory()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()


    const goToNextPage = async () => {
        if ( !content || content == '' ) {
            onOpen()

        } else  if(pages&&Object.keys(pages).length > 0 && pageData.pageNumber in pages){
            await updatePage(bookInfo.id)
            setPageContent({})
            if (editor.children) {
                editor.children =  [
                    {
                      type: 'paragraph',
                      children: [{ text: '' }],
                    },
                  ]
            }
            navigate(`/write/page/${parseInt(pageData.pageNumber) + 1}`, { pageNumber: parseInt(pageData.pageNumber) + 1 })
          }else {
            await createPage(bookInfo.id)
            setContent('')
            if (editor.children) {
                editor.children =  [
                    {
                      type: 'paragraph',
                      children: [{ text: '' }],
                    },
                  ]
            }
            navigate(`/write/page/${parseInt(pageData.pageNumber) + 1}`, { pageNumber: parseInt(pageData.pageNumber) + 1 })
        }
    }
    const goToPrevPage = async () => {

        if ( content && content!='') {
            await updatePage(bookInfo.id)
            setContent('')
        if (editor.children) {

            editor.children =  [
                {
                  type: 'paragraph',
                  children: [{ text: '' }],
                },
              ]
        }

        }
        
        pageData.pageNumber == '1' ? navigate('/write') : navigate(`/write/page/${parseInt(pageData.pageNumber) - 1}`, { pageNumber: parseInt(pageData.pageNumber) - 1 })


    }

    return (
        <Box marginY={'2.5rem'}>
            <Flex justifyContent={'space-around'}>
                <Button onClick={goToPrevPage} fontSize={'1rem'} color={'black'} variant={'outline'} width>Previous Page</Button>
                <BlackButton fontSize={'1rem'} onClick={goToNextPage} >Next Page</BlackButton>
                <AlertDialog
                    motionPreset='slideInBottom'
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isOpen={isOpen}
                    isCentered
                >
                    <AlertDialogOverlay />

                    <AlertDialogContent>
                        <AlertDialogHeader>Page can't be empty</AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            This page looks a little empty. Why not add some text or images
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Yes
                            </Button>
                            <Button colorScheme='red' ml={3} onClick={() => navigate(-1)}>
                                No
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </Flex>
            <Flex justifyContent={'space-around'}>
                <Button fontSize={'1rem'} color={'black'} variant={'outline'}>End Story</Button>
            </Flex>

        </Box>
    )
}
export default StoryPageFooter;
