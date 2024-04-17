import React, { useMemo } from 'react'
import imageExtensions from 'image-extensions'
import isUrl from 'is-url'
import isHotkey from 'is-hotkey'
import { Transforms, createEditor, Editor } from 'slate'
import {
  Slate,
  Editable,
  useSlateStatic,
  useSelected,
  useFocused,
  withReact,
  ReactEditor,
} from 'slate-react'
import { withHistory } from 'slate-history'
import { MButton, MIcon, Toolbar } from '../components/components'
import { Text, Flex, Box } from '@chakra-ui/react'
import CustomEditor from '../Helpers/CustomEditor'

import { Form } from '../components/popover_form'
import StyleTextButton from '../components/style_text_button'
import WriteWithAIButton from '../components/write_with_ai_btn'
import axios from "../axios";


const EditorWithImages = () => {
  const initialValue = useMemo(
    () =>
      JSON.parse(sessionStorage.getItem('content')) || [
        {
          type: 'paragraph',
          children: [{ text: '' }],
        },
      ],
    []
  )
  const editor = useMemo(
    () => withImages(withHistory(withReact(createEditor()))),
    []
  )
  const renderLeaf = React.useCallback(props => {
    return <Leaf {...props} />
  }, [])


  return (
    <Slate editor={editor} initialValue={initialValue} onChange={value => {
      
      const isAstChange = editor.operations.some(
        op => 'set_selection' !== op.type
      )
      if (isAstChange) {
        const content = JSON.stringify(value)
        if(content){
          sessionStorage.setItem('content', content)
        }   
      }
    }}>
      <Toolbar>
        <Flex justifyContent={'space-between'} marginBottom={'1.25rem'}>
           <WriteWithAIButton/>
          <StyleTextButton />
          <InsertImageButton />
        </Flex>

      </Toolbar>
      <Box mt='2rem' padding={'1.5rem'} border='2px solid black' borderRadius='20px' maxHeight={'440px'} height='320px' >
        <Editable
          editor={editor}
          onKeyDown={event => {
            if (isHotkey('mod+a', event)) {
              event.preventDefault()
              Transforms.select(editor, [])
            }
            else if (isHotkey('mod+b', event)) {
              event.preventDefault()
              CustomEditor.toggleBoldMark(editor)
            }
            else if (isHotkey('mod+i', event)) {
              event.preventDefault()
              CustomEditor.toggleItalicMark(editor)
            }
            else if (isHotkey('mod+u', event)) {
              event.preventDefault()
              CustomEditor.toggleUnderlineMark(editor)
            }
          }}
          renderElement={props => <Element {...props} />}
          // renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some text..."
        />
      </Box>
    </Slate>
  )
}

const withImages = editor => {
  const { insertData, isVoid } = editor

  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element)
  }

  editor.insertData = data => {
    const text = data.getData('text/plain')
    const { files } = data

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader()
        const [mime] = file.type.split('/')

        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result
            insertImage(editor, url)
          })

          reader.readAsDataURL(file)
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

const insertImage = (editor, url) => {
  const text = { text: '' }
  const image = { type: 'image', url, children: [text] }
  Transforms.insertNodes(editor, image)
  Transforms.insertNodes(editor, {
    type: 'paragraph',
    children: [text ],
  })
}

const Element = props => {
  const { attributes, children, element } = props

  switch (element.type) {
    case 'image':
      return <Image {...props} />
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Image = ({ attributes, children, element }) => {
  const editor = useSlateStatic()
  const path = ReactEditor.findPath(editor, element)

  const selected = useSelected()
  const focused = useFocused()
  return (
    <Box {...attributes} padding={'1rem'}>
      {children}
      <Flex
        contentEditable={false}
        justifyContent={'center'}
      >
        <img
          src={element.url}
          height={'100px'}
          width={'280px'}
        />
        <MButton
          variant='ghost'
          height='40px'
          minWidth='20px'
          marginLeft='-2.8rem'
          active
          onClick={() => Transforms.removeNodes(editor, { at: path })}
        >
          <MIcon eltype='delete' >delete</MIcon>
        </MButton>
      </Flex>
    </Box>
  )
}

export const generateAIImage = async(mprompt)=>{
  let mres = ''
  const base_url = process.env.REACT_APP_BASE_URL
  const prompt = mprompt 
  await axios()
  .post(`${base_url}/pages/generateImage`, {
      prompt: prompt,
    })
      .then((res) => {
      if (res.data && res.data.imageUrl){
          mres = res.data.imageUrl
      }        
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
      return mres
}

const InsertImageButton = () => {
  const editor = useSlateStatic()
  return (
    <MButton
      onMouseDown={async (event) => {
        event.preventDefault()
        const selectedText = Editor.string(editor, editor.selection);
        if (!selectedText){
          return
        }
        const url = await generateAIImage(selectedText);
      
        if (url && !isImageUrl(url)) {
          alert('URL is not an image')
          return
        }
        url && insertImage(editor, url)
      }}
    >      
          <>
            <MIcon eltype='image'>image</MIcon>
            <Text fontSize={'14px'}>Add Image</Text>
          </>
    </MButton>
  )
}

export const isImageUrl = url => {
  if (!url) return false
  if (url.slice(0,4) == 'data'){
    return true
  }
  if (!isUrl(url)) return false
  const ext = new URL(url).pathname.split('.').pop()
  return imageExtensions.includes(ext)
}
const Leaf = props => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal', fontStyle: props.leaf.italic ? 'italic' : 'normal', textDecoration: props.leaf.underline ? 'underline' : 'none' }}
    >
      {props.children}
    </span>
  )
}


export default EditorWithImages