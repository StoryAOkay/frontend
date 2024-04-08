import React from 'react'
import ReactDOM from 'react-dom'
import { Icon } from '@chakra-ui/react'
import { FaImages } from "react-icons/fa6";
import { Button } from '@chakra-ui/react'
import { TiDeleteOutline } from "react-icons/ti";


export const MButton = React.forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    },
    ref
  ) => {    
    return(
    <Button
      {...props}
      ref={ref}
      padding={'1rem'}
      height={props.height || '60px'}
      minWidth={ props.minWidth || '182px'}
      borderRadius={'32px'}
      colorScheme='black' 
      variant= {  props.variant || 'outline'   }
      marginLeft={ 0|| props.marginLeft}
    />
  )}
)

export const EditorValue = React.forwardRef(
  (
    {
      className,
      value,
      ...props
    },
    ref
  ) => {
    const textLines = value.document.nodes
      .map(node => node.text)
      .toArray()
      .join('\n')
    return (
      <div
        ref={ref}
        {...props}
      >
        <div>
          Slate's value as text
        </div>
        <div>
          {textLines}
        </div>
      </div>
    )
  }
)

export const MIcon = React.forwardRef(
  (
    { className, ...props },
    ref
  ) =>
  {
    return (
        <Icon  as={ props.eltype == 'delete' ? TiDeleteOutline  : FaImages } boxSize={10}   {...props} color='black.200' 
        ref={ref} marginRight={'0.5rem'}/>
  )}
)

export const Instruction = React.forwardRef(
  (
    { className, ...props },
    ref
  ) => (
    <div
      {...props}
      ref={ref}
    />
  )
)

export const Menu = React.forwardRef(
  (
    { className, ...props },
    ref
  ) => (
    <div
      {...props}
      data-test-id="menu"
      ref={ref}    
    />
  )
)

export const Portal = (children ) => {
  return typeof document === 'object'
    ? ReactDOM.createPortal(children, document.body)
    : null
}

export const Toolbar = React.forwardRef(
  (
    { className, ...props },
    ref
  ) => (
    <Menu
      {...props}
      ref={ref}
    />
  )
)