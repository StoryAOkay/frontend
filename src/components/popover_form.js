import React from "react";
import {Stack, Button, ButtonGroup, PopoverCloseButton, PopoverArrow, Popover, PopoverContent, FocusLock, Input, FormLabel, FormControl, useDisclosure} from '@chakra-ui/react';

export const TextInput = React.forwardRef((props, ref) => {
    return (
      <FormControl>
        <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
        <Input ref={ref} id={props.id} {...props} />
      </FormControl>
    )
  })
  

  export const Form = ({ firstFieldRef, onCancel, text }) => {
    return (
      <Stack spacing={4}>
        <TextInput
          label={'Enter ' + text +' prompt'}
          id={text + '-prompt'}
          ref={firstFieldRef}
        />
        <ButtonGroup display='flex' justifyContent='flex-end'>
          <Button variant='outline' onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onCancel} colorScheme='teal'>
            Generate
          </Button>
        </ButtonGroup>
      </Stack>
    )
  }
  

  const PopoverForm = ({children, ...props}) => {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const firstFieldRef = React.useRef(null)
  
    return (
      <>
        <Popover
          isOpen={isOpen}
          initialFocusRef={firstFieldRef}
          onOpen={onOpen}
          onClose={onClose}
          placement='right'
          closeOnBlur={false}
        >
            <>
          {children}
          <PopoverContent p={5}>
            <FocusLock returnFocus persistentFocus={false}>
              <PopoverArrow />
              <PopoverCloseButton />
              <Form firstFieldRef={firstFieldRef} onCancel={onClose} />
            </FocusLock>
          </PopoverContent>
          </>
        </Popover>
      </>
    )
  }
  
  export default PopoverForm;