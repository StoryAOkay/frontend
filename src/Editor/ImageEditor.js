import React, { useMemo } from 'react'
import imageExtensions from 'image-extensions'
import isUrl from 'is-url'
import isHotkey from 'is-hotkey'
import { Transforms, createEditor } from 'slate'
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
import { Text, Flex, Box, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import CustomEditor from '../Helpers/CustomEditor'

import { FaBold , FaItalic, FaUnderline} from "react-icons/fa6";

const initialValue = [
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],

  },]



const EditorWithImages = () => {
  const editor = useMemo(
    () => withImages(withHistory(withReact(createEditor()))),
    []
  )
  const renderLeaf = React.useCallback(props => {
    return <Leaf {...props} />
  }, [])


  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Toolbar>
        <Flex justifyContent={'space-between'} marginBottom={'1.25rem'}>
          <InsertImageButton />
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
    children: [{ text: '' }],
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
          height={'180px'}
          width={'500px'}
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

const InsertImageButton = () => {
  const editor = useSlateStatic()
  return (
    <MButton
      onMouseDown={event => {
        event.preventDefault()
        const url = window.prompt('Enter the URL of the image:')
        if (url && !isImageUrl(url)) {
          alert('URL is not an image')
          return
        }
        url && insertImage(editor, url)
      }}
    >
      <MIcon eltype='image'>image</MIcon>
      <Text fontSize={'14px'}>Add Image</Text>
    </MButton>
  )
}
const CustomMenuButton = ({ children, ...props }) => {
  return (<MenuButton as='div'  {...props}>
    {children}
  </MenuButton>)
}
const StyleTextButton = () => {
  const editor = useSlateStatic()
  return (
  
    <MMenu>
      <CustomMenuButton
        aria-label='Options'
   
      >    
      <MButton>
      <MIcon eltype='style' boxSize={8} marginRight='1rem'>edit</MIcon>
        <Text fontSize={'14px'}>Style text</Text>
      </MButton>
      
      </CustomMenuButton>
      <MenuList>
        <MenuItem onClick={(event) =>  {event.preventDefault()
        CustomEditor.toggleBoldMark(editor)}} icon={<FaBold />} command='⌘b' 
    >
          Bold
        </MenuItem>
        <MenuItem icon={<FaItalic />} command='⌘i' onClick={(event) =>  {event.preventDefault()
        CustomEditor.toggleItalicMark(editor)}}>
          Italic
        </MenuItem>
        <MenuItem icon={<FaUnderline />} command='⌘u' onClick={(event) =>  {event.preventDefault()
        CustomEditor.toggleUnderlineMark(editor)}}>
          Underline
        </MenuItem>

      </MenuList>
    </MMenu>

  )
}
export const MMenu = React.forwardRef(
  (
    { className, ...props },
    ref
  ) => (

    <Menu  {...props}
      data-test-id="menu"
      ref={ref}>

    </Menu>
  )
)
const isImageUrl = url => {
  if (!url) return false
  if (!isUrl(url)) return false
  const ext = new URL(url).pathname.split('.').pop()
  return imageExtensions.includes(ext)
}
const Leaf = props => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' , fontStyle: props.leaf.italic ? 'italic': 'normal', textDecoration : props.leaf.underline ? 'underline': 'none'}}
    >
      {props.children}
    </span>
  )
}


export default EditorWithImages