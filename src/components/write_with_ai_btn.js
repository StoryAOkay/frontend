import React from 'react'
import { useSlateStatic } from 'slate-react'
import { Transforms, createEditor, Editor } from 'slate'
import { MButton, MIcon } from '../components/components'
import { Text, MenuItem, MenuButton, MenuList, Menu } from '@chakra-ui/react'


import { MMenu, CustomMenuButton } from './style_text_button';

  

const WriteWithAIButton = () => {
    const editor = useSlateStatic()
    return (

        <MMenu>
            <CustomMenuButton
                aria-label='Options'

            >
                <MButton>

                    <MIcon eltype='edit'>Write with ai</MIcon>
                    <Text fontSize={'14px'}>Write with ai</Text>

                </MButton>

            </CustomMenuButton>
            <MenuList>
                <MenuItem onClick={(e)=>{e.preventDefault();
                }}>Rewrite</MenuItem>
                <MenuItem>Shorten</MenuItem>
                <MenuItem>Generate Random</MenuItem>

            </MenuList>
        </MMenu>

    )
}
export default WriteWithAIButton;