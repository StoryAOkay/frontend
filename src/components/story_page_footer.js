import React from "react";
import { Text, Flex , Button, Box} from '@chakra-ui/react'
function StoryPageFooter(){
    return(
        <Box marginY={'2.5rem'}>
            <Flex justifyContent={ 'space-around'}>
            <Button fontSize={'1rem'} color={'black'} variant={'outline'} width>Previous Page</Button>
            <Button fontSize={'1rem'} colorScheme='blue'>Next page</Button>
            </Flex>
            <Flex justifyContent={ 'space-around'}>
            <Button fontSize={'1rem'} color={'black'} variant={'outline'}>End Story</Button>
            </Flex>
            
        </Box>
    )
}
export default StoryPageFooter;