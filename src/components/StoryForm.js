import React, {useEffect, useRef} from "react";
import { Box, Flex, Text, Input, Spinner, Textarea } from '@chakra-ui/react';
import BlackButton from "./black_button";
import { useNavigate , useParams} from 'react-router-dom';
import axios from "../axios";
import { useCurStory } from "../contexts/CurrentStoryContext";
import { generateAIImage, isImageUrl } from "../Editor/ImageEditor";
import { useAuth } from "../contexts/AuthContext";
import { useMyBooks } from "../contexts/MyBooksContext";

export default function StoryForm(){
    const [isLoading, setIsLoading] = React.useState(false);
    const [isUpdate, setIsUpdate] = React.useState(false);
    const navigate = useNavigate();
    const titleRef = useRef()
    const imageRef = useRef()
    const descriptionRef = useRef()
    const {setCurBookInfo, setCurStoryNull, bookInfo} =useCurStory()
    const base_url = process.env.REACT_APP_BASE_URL;
    const params = useParams()
    const {user} = useAuth()
    const {getMyBooks} = useMyBooks()

    const generate_image_url = async (nurl)=>{
        if (isImageUrl(nurl)){
            return nurl
        }
        nurl = nurl || 'generate an image of a random color'
        const url = await generateAIImage();
        if (url && !isImageUrl(url)) {
          alert('URL is not an image')
          return
        }
        return url

    }
    const submit = async (event)=>{
        event.preventDefault();
        const imageUrl = await generate_image_url(imageRef.current.value)
        const pageData = {pageNumber: 1}
        await axios()
            .post(`${base_url}/stories`, {
                author: user.id,
                title: titleRef.current.value,
                description: descriptionRef.current.value,
                image: imageUrl,
                author_name: user.name,
                author_age: user.age,
                html_content: `<div class=\"title\"><h1>${titleRef.current.value}</h1><img src= ${imageUrl}/></div>`
            })
            .then((res) => {
                setCurBookInfo(res.data)
                getMyBooks()
               navigate(`/write/page/${pageData.pageNumber}`, pageData)
            })
            .catch((error) => {
               alert(error.message);
            });
       
        
    }
    const update = async (event)=>{
        event.preventDefault();
        if ( !bookInfo || !Object.keys(bookInfo).length > 0){
            return
        }
        const id = bookInfo.id
        const imageUrl = await generate_image_url(imageRef.current.value)
        setCurStoryNull()
        const pageData = {pageNumber: 1}
        await axios()
            .put(`${base_url}/stories/${id}`, {
                author: user.id,
                title: titleRef.current.value,
                description: descriptionRef.current.value,
                image: imageUrl,
                html_content: `<div class=\"title\"><h1>${titleRef.current.value}</h1><img src= ${imageUrl}/></div>`
            })
            .then((res) => {
                setCurBookInfo(res.data) 
                getMyBooks()               
               navigate(`/write/page/${pageData.pageNumber}`, pageData)
            })
            .catch((error) => {
               alert(error.message);
            });
    }
    useEffect(()=>{
        if (bookInfo && Object.keys(bookInfo).length > 0){
            titleRef.current.value = bookInfo.title
            descriptionRef.current.value = bookInfo.description
            imageRef.current.value = bookInfo.image
            setIsUpdate(true)
        }
      

    },[params])
    return (<Box>
        

        <Flex
            pb="1rem"
            flexDirection={"column"}
            alignItems="left"
        >
            <Box textAlign={'left'}>
                
                <Text>Title</Text>
                <Input
                    isRequired
                    type="text"
                    pr="4.5rem"
                    height="48px"
                    borderRadius={"5px"}
                    border="2px solid black"
                    paddingLeft={"2rem"}
                    maxWidth='60%'
                    ref={titleRef}
                    
                />
                <Text pt='2rem' >Description</Text>
                <Textarea
                    type="text"
                    pr="4.5rem"
                    height="96px"
                    borderRadius={"5px"}
                    border="2px solid black"
                    paddingLeft={"2rem"}
                    maxWidth='90%'
                    ref={descriptionRef}

                />
                <Text  pt='2rem'>ImageURL</Text>
                <Input
                    type="email"
                    pr="4.5rem"
                    height="60px"
                    borderRadius={"5px"}
                    border="2px solid black"
                    paddingLeft={"2rem"}
                    maxWidth='90%'
                    ref={imageRef}
                    placeholder="Type image url or a prompt to generate an image"
                    
                />
                <Flex justifyContent={'left'}>
                <BlackButton
                    marginBottom="8px"
                    borderRadius="10px"
                    height="48px"
                    width="240px"
                    fontWeight={'normal'}
                    fontSize="20px"
                    marginTop={"2rem"}
                    _hover={{ background: "#3182CE" }}
                    _active={{ background: "#3182CE" }}
                    onClick={ isUpdate? update : submit}
                >
                    {isLoading ? (
                        <span>
                            {" "}
                            <Spinner /> 
                        </span>
                    ) :  isUpdate ? (
                        'Update My Story'
                    ):  (
                        'Start My Story'
                    ) }
                </BlackButton>
                
                </Flex>
                
            </Box>

        </Flex>
    </Box>)
}