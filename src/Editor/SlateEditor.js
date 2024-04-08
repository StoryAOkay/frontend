import React, { useState, useCallback } from 'react'
import { createEditor, Editor, Transforms, Element } from 'slate'

import { Slate, Editable, withReact } from 'slate-react'
import CustomEditor from '../Helpers/CustomEditor'
const initialValue = [
  {
    type: 'paragraph',
    url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2023/07/top-20-small-dog-breeds.jpeg.jpg',
    children: [{ text: 'A line of text in a paragraph.' }, { text: 'A line of text in a paragraph2.' }],
  },
  //   {
  //     type: 'paragraph2',
  //     children: [{ text: 'A line of text in a paragraph.' }, { text: 'A line of text in a paragraph2.' }],
  //   },
  //  {
  //     type: 'link',
  //     url: 'https://example.com',
  //     children: [{text:  'https://google.com' }]
  //   }
]



const SlateEditor = () => {
  const [editor] = useState(() => withReact(createEditor()))
  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])
  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])
  
  return (
    <Slate editor={editor} initialValue={initialValue}>
      <div>
        <button
          onMouseDown={event => {
            event.preventDefault()
            CustomEditor.toggleBoldMark(editor)
          }}
        >
          Bold
        </button>
        <button
          onMouseDown={event => {
            event.preventDefault()
            CustomEditor.toggleCodeBlock(editor)
          }}
        >
          Code Block
        </button>
      </div>
      <Editable
        editor={editor}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={event => {
          if (!event.ctrlKey) {
            return
          }

          switch (event.key) {
            case '`': {
              event.preventDefault()
              CustomEditor.toggleCodeBlock(editor)
              break
            }

            case 'b': {
              event.preventDefault()
              CustomEditor.toggleBoldMark(editor)
              break
            }
          }
        }}
      />
    </Slate>
    )
}
// Define a React component renderer for our code blocks.
const CodeElement = props => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}



const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>
}



// Define a React component to render leaves with bold text.
const Leaf = props => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  )
}
export default SlateEditor;
