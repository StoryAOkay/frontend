import React from "react";
import { Text, Flex , Button, Box} from '@chakra-ui/react'
function StoryPageFooter(){
    return(
        <Box marginY={'2.5rem'}>
            <Flex justifyContent={ 'space-around'}>
            <Button fontSize={'1rem'} color={'black'} variant={'outline'} width>Previous Page</Button>
            <BlackButton fontSize={'1rem'} >Next Page</BlackButton>
            </Flex>
            <Flex justifyContent={ 'space-around'}>
            <Button fontSize={'1rem'} color={'black'} variant={'outline'}>End Story</Button>
            </Flex>
            
        </Box>
    )
}
export default StoryPageFooter;
const BlackButton = ({ children, ...props }) => (
    <Button
      {...props}
      bg="black"
      color="white"
      _hover={{ bg: "gray.700" }} // Optional hover effect
    >
      {children}
    </Button>
  );