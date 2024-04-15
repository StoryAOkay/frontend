import React from 'react'
import { useSlateStatic } from 'slate-react'
import { MButton, MIcon } from '../components/components'
import { Text, MenuItem, MenuButton, MenuList, Menu} from '@chakra-ui/react'
import CustomEditor from '../Helpers/CustomEditor'

import { FaBold, FaItalic, FaUnderline } from "react-icons/fa6";

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
export const CustomMenuButton = ({ children, ...props }) => {
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
          <MenuItem onClick={(event) => {
            event.preventDefault()
            CustomEditor.toggleBoldMark(editor)
          }} icon={<FaBold />} command='⌘b'
          >
            Bold
          </MenuItem>
          <MenuItem icon={<FaItalic />} command='⌘i' onClick={(event) => {
            event.preventDefault()
            CustomEditor.toggleItalicMark(editor)
          }}>
            Italic
          </MenuItem>
          <MenuItem icon={<FaUnderline />} command='⌘u' onClick={(event) => {
            event.preventDefault()
            CustomEditor.toggleUnderlineMark(editor)
          }}>
            Underline
          </MenuItem>
  
        </MenuList>
      </MMenu>
  
    )
  }
  export default StyleTextButton;