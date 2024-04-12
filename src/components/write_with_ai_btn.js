import React from 'react'
import { useSlateStatic } from 'slate-react'
import { Transforms, createEditor, Editor } from 'slate'
import { MButton, MIcon } from '../components/components'
import { Text, MenuItem, MenuButton, MenuList, Menu } from '@chakra-ui/react'
import axios from "../axios";

import { MMenu, CustomMenuButton } from './style_text_button';

const generateAIText = async(mprompt, mtype)=>{
    let prompt =''
    let mres = ''

    if (mtype == 'rewrite'){
        prompt= 'Kindly rewrite the following text to form a short paragraph, a maximum of three sentence, as part of a story to be understood by children age 5 to 11: ' + mprompt 
    }else if(mtype == 'shorten'){
        prompt = 'Kindly shorten the following text to form a sentence as part of a story to be understood by children age 5 to 11: ' + mprompt 
    }else if(mtype == 'random'){
        prompt= 'Kindly generate some random text to form a short paragraph, a maximum of three sentences, as part of a story to be understood by children age 5 to 11: ' 
    }
    if(!prompt){
        return ''
    }
    const base_url = process.env.REACT_APP_BASE_URL
    
    await axios()
    .post(`${base_url}/pages/generateText`, {
        text: prompt,
      })
        .then((res) => {
            
        if (res.data && res.data.text){
            mres = res.data.text
        }        
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
        return mres
}
  
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
                <MenuItem onClick={async (e)=>{e.preventDefault();
                    const selectedText = Editor.string(editor, editor.selection);
                    const genText = await generateAIText(selectedText, 'rewrite')
                    if (genText){
                        Transforms.insertText(editor,genText)
                    } 
                }}>Rewrite</MenuItem>
                <MenuItem onClick={async (e)=>{e.preventDefault();
                    const selectedText = Editor.string(editor, editor.selection);
                    const genText = await generateAIText(selectedText, 'shorten')
                    if (genText){
                        Transforms.insertText(editor,genText)
                    } 
                }}>Shorten</MenuItem>
                <MenuItem onClick={async (e)=>{e.preventDefault();
                    const selectedText = '';
                    const genText = await generateAIText(selectedText, 'random')
                   
                    Transforms.insertText(editor,genText)
                     
                }}>Generate Random</MenuItem>

            </MenuList>
        </MMenu>

    )
}
export default WriteWithAIButton;